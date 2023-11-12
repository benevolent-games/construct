
import {Item} from "../../../domains/outline/types.js"
import {produce_item_reports} from "./produce_reports.js"

export type OutlineStuff = ReturnType<typeof compute_outline_stuff>

export function compute_outline_stuff(root: Item.Folder) {
	const reports = produce_item_reports(root)
	const items = reports.map(report => report.item)

	return {
		root,
		reports,
		items,

		folders: items
			.filter(item => item.kind === "folder") as Item.Folder[],

		instances: items
			.filter(item => item.kind === "instance") as Item.Instance[],

		lights: items
			.filter(item => item.kind === "light") as Item.Light[],

		selected: items
			.filter(item => item.selected) as Item.Whatever[],
	}
}

