
import {generateId} from "@benev/toolbox/x/utils/generate-id.js"
import {AssetContainer} from "@babylonjs/core/assetContainer.js"

import {AssetProp, LOD, LODs, PropNode, lod_names} from "./types.js"

export function parse_props(container: AssetContainer): AssetProp[] {
	const transforms = container.transformNodes
	const meshes_under_transforms = new Set(transforms.flatMap(t => t.getChildMeshes()))
	const naked_meshes = new Set(container.meshes.filter(m => !meshes_under_transforms.has(m)))
	const nodes = new Set([...transforms, ...naked_meshes])

	const pattern = /^(.+?)(?:#(\d+))?(?:(:.+))?$/

	const stage1 = {
		map: new Map<string, {
			lods: {
				index: number
				node: PropNode
				twosided: boolean
			}[]
			collision: undefined | PropNode
		}>(),
		grab(name: string) {
			let data = stage1.map.get(name)
			if (!data) {
				data = {
					lods: [],
					collision: undefined,
				}
				stage1.map.set(name, data)
			}
			return data
		},
	}

	for (const node of nodes) {
		const {name: propstring} = node

		if (propstring.startsWith("__"))
			continue

		const match = propstring.match(pattern)

		if (match) {
			const name = match[1]
			const lod_index = match[2] ? parseInt(match[2], 10) : undefined
			const directives = match[3] || undefined
			const data = stage1.grab(name)

			if (directives?.includes(":collision"))
				data.collision = node

			if (lod_index !== undefined)
				data.lods.push({
					node,
					index: lod_index,
					twosided: directives?.includes(":twoside") ?? false,
				})
		}
		else
			console.warn(`invalid prop "${propstring}"`)
	}

	const stage2 = [...stage1.map.entries()].map(([name, {lods, collision}]) => {
		const lod_slots: (LOD | undefined)[] = lod_names.map(() => undefined)

		for (const {index, node, twosided} of lods) {

			if (lod_slots[index] !== undefined)
				throw new Error(`duplicate lod ${index} "${lod_name_by_index(index)}"`)

			lod_slots[index] = {node, twosided}
		}

		const prop: AssetProp = {
			id: generateId(),
			name,
			collision,
			lods: lods_fill_forward(lod_slots),
		}

		return prop
	})

	return stage2
}

function lod_name_by_index(index: number) {
	const name = lod_names[index]

	if (!name)
		throw new Error(`invalid lod index number ${index}`)

	return name
}

function lods_fill_forward(lods: (LOD | undefined)[]) {
	if (!lods[0])
		throw new Error(`high lod missing`)

	let previous: LOD | undefined = lods[0]

	return lods.map((lod, index) => {
		previous = lods[index - 1]
		const is_final = index === lods.length - 1
		return is_final
			? lod!
			: lod ?? previous!
	}) as LODs
}

