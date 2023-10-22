
import {generateId} from "@benev/toolbox/x/utils/generate-id.js"
import {AssetContainer} from "@babylonjs/core/assetContainer.js"

import {GlbProp, LODs, PropNode, lod_names} from "./types.js"

export function parse_props(container: AssetContainer): GlbProp[] {
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
		const lod_slots = lod_names.map(() => undefined) as LODs

		for (const {index, node, twosided} of lods) {

			if (lod_slots[index] !== undefined)
				throw new Error(`duplicate lod ${index} "${lod_name_by_index(index)}"`)

			lod_slots[index] = {node, twosided}
		}

		const first_lod_index = lod_slots.findIndex(item => !!item)
		if (first_lod_index === -1)
			throw new Error(`prop is missing any lod!? "${name}"`)

		const top_lod = lod_slots[first_lod_index]
		if (!top_lod)
			throw new Error("no top lod!?")

		const prop: GlbProp = {
			name,
			collision,
			first_lod_index,
			lods: lod_slots,
			top_lod: lod_slots[first_lod_index]!,
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

