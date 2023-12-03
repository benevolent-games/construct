
import {actionate} from "../../actionate.js"
import {Id} from "../../../../tools/fresh_id.js"
import {ascertain_which_items_should_be_moved} from "./utils/ascertain_which_items_should_be_moved.js"

export const move_into_folder = actionate.outline.action(outline => (
		{folderId, itemIds}: {
			folderId: Id,
			itemIds: Id[],
		},
	) => {

	const destinationFolder = outline.getFolder(folderId)
	const targetReport = outline.reports.find(r => r.item.id === folderId)!

	const stuff_to_move = ascertain_which_items_should_be_moved(
		outline,
		itemIds,
		targetReport,
	)

	// delete all the items
	for (const {item, parent} of stuff_to_move)
		parent.children = (
			parent.children.filter(child => child.id !== item.id)
		)

	// insert all the items
	for (const {item} of stuff_to_move)
		destinationFolder.children.unshift(item)
})

