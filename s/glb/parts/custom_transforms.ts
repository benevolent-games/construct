
import {MeshoptSimplifier} from "meshoptimizer"
import {Document, Mesh, Node} from "@gltf-transform/core"
import {simplifyPrimitive, weldPrimitive} from "@gltf-transform/functions"

export function delete_meshes(...lods: string[]) {
	return (document: Document) => {
		for (const node of document.getRoot().listNodes()) {
			const name = node.getName()
			if (lods.some(lod => name.includes(lod)))
				node.dispose()
		}
	}
}

// export function simplify_meshes({select_meshes, ...options}: {
// 		error: number,
// 		ratio: number,
// 		lockBorder: boolean,
// 		select_meshes: (document: Document) => Set<Mesh>
// 	}): Transform {

// 	return document => {
// 		for (const mesh of select_meshes(document)) {
// 			for (const primitive of mesh.listPrimitives()) {
// 				simplifyPrimitive(document, primitive, {
// 					...options,
// 					simplifier: MeshoptSimplifier,
// 				})
// 			}
// 		}
// 	}
// }

const pattern = /^(.+?)(?:#(\d+))?(?:(:.+))?$/

function parse_node(name: string) {
	const match = name.match(pattern)
	if (match)
		return {
			basename: match[1],
			lod: match[2]
				? parseInt(match[2], 10)
				: undefined,
			directives: match[3] || undefined,
		}
	else
		throw new Error(`invalid prop "${name}"`)
}

const ratios = [1.0, 0.5, 0.25, 0.125, 0.05] as const
type LOD = Node | undefined
type LODs = [LOD, LOD, LOD, LOD, LOD]
type Group = {
	lods: LODs
	directives?: string
}

function gather_lods(document: Document) {
	const groups = new Map<string, Group>()

	function grab(basename: string) {
		let group = groups.get(basename)
		if (!group) {
			group = {
				lods: ratios.map(_ => undefined) as LODs,
				directives: undefined,
			}
			groups.set(basename, group)
		}
		return group
	}

	for (const node of document.getRoot().listNodes()) {
		if (node.getMesh()) {
			const {basename, lod, directives} = parse_node(node.getName())
			const group = grab(basename)
			group.directives = directives
			if (lod !== undefined)
				group.lods[lod] = node
		}
	}

	return groups
}

const set = new Set<any>()

export const generate_lods = () => (document: Document) => {
	for (const [basename, {lods}] of gather_lods(document)) {
		const top_index = lods.findIndex(n => !!n)

		if (top_index === -1) {
			console.warn(`missing lod index for "${basename}"`)
			continue
			// throw new Error(`missing lod index for "${name}"`)
		}

		const top_node = lods[top_index]!
		const top_ratio = ratios[top_index]!

		// backfill high quality lods
		for (let i = 0; i < top_index; i++) {
			const name = `${basename}#${i}`
			lods[i] = clone_node(document, top_node, name)
		}

		// fillforward lower quality lods
		for (let i = top_index + 1; i < ratios.length; i++) {
			const current_ratio = ratios[i]
			const target_ratio = current_ratio / top_ratio
			const node = lods[i]
			if (!node) {
				const name = `${basename}#${i}`
				const new_node = clone_node(document, top_node, name)
				const new_mesh = new_node.getMesh()!

				if (set.has(new_mesh))
					throw new Error(`dupe mesh ${name}, ${new_mesh.getName()}`)
				set.add(new_mesh)

				const before = verts(new_mesh)

				for (const primitive of new_mesh.listPrimitives()) {
					if (i >= 1)
						weldPrimitive(document, primitive, {tolerance: 0.001, overwrite: true, exhaustive: true, toleranceNormal: 0.5})
					simplifyPrimitive(document, primitive, {
						error: 1,
						lockBorder: false,
						ratio: target_ratio * 3,
						simplifier: MeshoptSimplifier,
					})
				}
				const after = verts(new_mesh)
				// if (name.includes("barrel"))
				console.log(` - ${name} @ ${new_mesh.getName()} (${current_ratio}/${target_ratio.toFixed(2)}) ${before} -> ${after}`)
				lods[i] = new_node
			}
		}
	}
}

function verts(mesh: Mesh) {
	let vertices = 0
	for (const primitive of mesh.listPrimitives()) {
		const position = primitive.getAttribute('POSITION')!
		vertices += position.getCount()
	}
	return vertices
}

// const clone_node = (document: Document, node: Node, new_name: string) => {
// 	const newNode = document.createNode(new_name)
// 		.setTranslation(node.getTranslation())
// 		.setRotation(node.getRotation())
// 		.setScale(node.getScale())

// 	const mesh = node.getMesh()
// 	if (mesh)
// 		newNode.setMesh(mesh.clone())

// 	for (const child of node.listChildren())
// 		newNode.addChild(clone_node(document, child, child.getName() + "-clone"))

// 	return newNode
// }

let count = 0

const clone_node = (document: Document, node: Node, new_name: string) => {
	const scene = document.getRoot().getDefaultScene()
	if (!scene)
		throw new Error("glb doesn't have a default scene")

	const newNode = document.createNode(new_name)
		.setTranslation(node.getTranslation())
		.setRotation(node.getRotation())
		.setScale(node.getScale())

	const mesh = node.getMesh()

	if (mesh) {
		// const newMesh = mesh.clone()
		// newMesh.setName(newMesh.getName() + "-clone")

		// const primitives = newMesh.listPrimitives()
		// const cloned_primitives = primitives
		// 	.map(p => p.clone())
		// 	.map(p => p.setName(p.getName() + "-clone"))

		// for (const p of primitives)
		// 	newMesh.removePrimitive(p)

		// for (const p of cloned_primitives)
		// 	newMesh.addPrimitive(p)

		const newMesh = clone_mesh(document, mesh, mesh.getName() + "." + count++)
		newNode.setMesh(newMesh)
	}

	scene.addChild(newNode)
	return newNode
}

function clone_mesh(document: Document, mesh: Mesh, name: string) {
	return document
		.createMesh(name)
		.copy(mesh, ref => ref.clone())
		.setName(name)
}

