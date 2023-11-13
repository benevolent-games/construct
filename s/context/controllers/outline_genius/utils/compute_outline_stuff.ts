
import {Item} from "../../../domains/outline/types.js"
import {produce_item_reports} from "./produce_reports.js"

export type OutlineStuff = ReturnType<typeof compute_outline_stuff>

export function compute_outline_stuff(root: Item.Folder) {
	const reports = produce_item_reports(root)
	const items = reports.map(report => report.item)

	const nonrootReports = reports
		.filter(report => report.item.id !== root.id)

	const nonrootItems = items
		.filter(item => item.id !== root.id)

	return {
		root,
		reports,
		items,

		nonrootReports,
		nonrootItems,

		folders: items
			.filter(item => item.kind === "folder") as Item.Folder[],

		instances: items
			.filter(item => item.kind === "instance") as Item.Instance[],

		lights: items
			.filter(item => item.kind === "light") as Item.Light[],

		selected: nonrootItems
			.filter(item => item.selected) as Item.Whatever[],
	}
}

