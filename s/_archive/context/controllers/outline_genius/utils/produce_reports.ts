
import {Item} from "../../../domains/outline/types.js"

export function produce_item_reports(root: Item.Folder) {
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

	recurse(root, [])

	return reports
}

