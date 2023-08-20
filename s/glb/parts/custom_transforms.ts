
import {MeshoptSimplifier} from "meshoptimizer"
import {simplifyPrimitive} from "@gltf-transform/functions"
import {Document, Mesh, Transform, Node} from "@gltf-transform/core"

export function delete_meshes(...lods: string[]) {
	return (document: Document) => {
		for (const node of document.getRoot().listNodes()) {
			const name = node.getName()
			if (lods.some(lod => name.includes(lod)))
				node.dispose()
		}
	}
}

export function simplify_meshes({select_meshes, ...options}: {
		error: number,
		ratio: number,
		lockBorder: boolean,
		select_meshes: (document: Document) => Set<Mesh>
	}): Transform {

	return document => {
		for (const mesh of select_meshes(document)) {
			for (const primitive of mesh.listPrimitives()) {
				simplifyPrimitive(document, primitive, {
					...options,
					simplifier: MeshoptSimplifier,
				})
			}
		}
	}
}

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

const ratios = [1.0, 0.5, 0.25, 0.125, 0.0625] as const
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

export const generate_lods = () => (document: Document) => {
	for (const [name, {lods}] of gather_lods(document)) {
		const top_index = lods.findIndex(n => !!n)

		if (top_index === -1) {
			console.warn(`missing lod index for "${name}"`)
			continue
		}
			// throw new Error(`missing lod index for "${name}"`)

		const top_node = lods[top_index]!
		const top_ratio = ratios[top_index]!

		// backfill high quality lods
		for (let i = 0; i < top_index; i++)
			lods[i] = clone_node(document, top_node, `${name}#${i}`)

		// fillforward lower quality lods
		for (let i = top_index + 1; i < ratios.length; i++) {
			const current_ratio = ratios[i]
			const target_ratio = current_ratio / top_ratio
			const node = lods[i]
			if (!node) {
				const new_node = clone_node(document, top_node, `${name}#${i}`)
				for (const primitive of new_node.getMesh()!.listPrimitives()) {
					simplifyPrimitive(document, primitive, {
						error: 0.001,
						lockBorder: true,
						simplifier: MeshoptSimplifier,
						ratio: target_ratio,
					})
				}
				lods[i] = new_node
			}
		}
	}
}

const clone_node = (document: Document, node: Node, new_name: string) => {
	const newNode = document.createNode(new_name)
		.setMesh(node.getMesh()!)
		.setTranslation(node.getTranslation())
		.setRotation(node.getRotation())
		.setScale(node.getScale())

	const mesh = node.getMesh()
	if (mesh)
		newNode.setMesh(mesh)

	for (const child of node.listChildren())
		newNode.addChild(clone_node(document, child, new_name))

	return newNode
}

