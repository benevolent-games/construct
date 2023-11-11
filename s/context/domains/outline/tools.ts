
import {Item} from "./types.js"
import {State} from "../../state.js"
import {Id} from "../../../tools/fresh_id.js"

export type OutlineState = State["outline"]
export type OutlineTools = ReturnType<typeof make_outline_tools>

export function make_outline_tools(outline: OutlineState) {
	const reports: Item.Report[] = []

	function recurse(
			item: Item.Whatever,
			parents: Item.Folder[],
		) {
		reports.push({item, parents, parent: parents.at(-1)!})
		if (item.kind === "folder")
			for (const child of item.children)
				recurse(child, [...parents, item])
	}

	for (const item of outline.children)
		recurse(item, [outline])

	const items = reports.map(report => report.item)

	const folders = [
		outline,
		...items.filter(item => item.kind === "folder"),
	] as Item.Folder[]

	const instances = items
		.filter(item => item.kind === "instance") as Item.Instance[]

	const lights = items
		.filter(item => item.kind === "light") as Item.Light[]

	const selected = items
		.filter(item => item.selected) as Item.Whatever[]

	return {
		reports,
		items,
		folders,
		instances,
		lights,
		selected,
		isSelected(id: Id) {
			return selected.some(item => item.id === id)
		},
		isApparent(id: Id) {
			const isRoot = id === outline.id
			if (isRoot) {
				return outline.visible
			}
			else {
				const {item, parents} = reports.find(({item}) => item.id === id)!
				return item.visible && parents.every(parent => parent.visible)
			}
		},
		getItem(id: Id) {
			const item = items.find(item => item.id === id)
			if (!item)
				throw new Error(`item not found ${id}`)
			return item
		},
		getFolder(id: Id) {
			const folder = folders.find(folder => folder.id === id)
			if (!folder)
				throw new Error(`folder not found ${id}`)
			return folder
		},
	}
}

