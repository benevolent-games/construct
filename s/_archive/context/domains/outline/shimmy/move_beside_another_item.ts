
import {actionate} from "../../actionate.js"
import {Id} from "../../../../tools/fresh_id.js"
import {ascertain_which_items_should_be_moved} from "./utils/ascertain_which_items_should_be_moved.js"

export const move_beside_another_item = (
	(where: "above" | "below") =>
	actionate.outline.action(outline => (
		{itemIds, targetItemId}: {
			itemIds: Id[],
			targetItemId: Id,
		}
	) => {

	const indexMod = where === "above"
		? 0
		: 1

	const targetReport = outline.reports.find(r => r.item.id === targetItemId)!

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

	// get target index after other stuff
	// has been deleted (thus shifting the order)
	const targetIndex = targetReport.parent.children.indexOf(targetReport.item)

	// insert all the items
	targetReport.parent.children.splice(
		targetIndex + indexMod,
		0,
		...stuff_to_move.map(r => r.item)
	)
}))

