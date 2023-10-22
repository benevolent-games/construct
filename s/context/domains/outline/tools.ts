
import {State} from "../../state.js"
import {Id, Item, ItemReport} from "./types.js"

export type OutlineState = State["outline"]

export function make_outline_tools(outline: OutlineState) {
	const reports: ItemReport[] = []

	function recurse(
			item: Item.Whatever,
			parent: Item.Folder,
		) {
		reports.push({item, parent})
		if (item.kind === "folder")
			for (const child of item.children)
				recurse(child, item)
	}

	for (const item of outline.children)
		recurse(item, outline)

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

