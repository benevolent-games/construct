
// import {actionate} from "../../../actionate.js"
// import {Id} from "../../../../../tools/fresh_id.js"
// import {ascertain_which_items_should_be_moved} from "./utils/ascertain_which_items_should_be_moved.js"

// export const move_beside_another_item = (
// 	(where: "above" | "below") =>
// 	actionate.outline2.action(outline => (
// 		{itemIds, targetItemId}: {
// 			itemIds: Id[],
// 			targetItemId: Id,
// 		}
// 	) => {

// 	const indexMod = where === "above"
// 		? 0
// 		: 1

// 	const targetReport = outline.getReport(targetItemId)

// 	const ids_to_move = ascertain_which_items_should_be_moved(
// 		outline,
// 		itemIds,
// 		targetReport,
// 	).map(report => report.item.id)

// 	// disconnecting the items from the tree
// 	outline.detach_item_from_tree(...ids_to_move)

// 	const destinationChildren = outline.getParentalArray(targetReport)

// 	// get target index after other stuff
// 	// has been deleted (thus shifting the order)
// 	const targetIndex = destinationChildren.indexOf(targetReport.item.id)

// 	// insert all the items
// 	destinationChildren.splice(
// 		targetIndex + indexMod,
// 		0,
// 		...ids_to_move,
// 	)
// }))

