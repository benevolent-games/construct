
// import {Item} from "../../types/item.js"
// import {actionate} from "../../../actionate.js"
// import {Id} from "../../../../../tools/fresh_id.js"
// import {ascertain_which_items_should_be_moved} from "./utils/ascertain_which_items_should_be_moved.js"

// export const move_into_container = actionate.outline2.action(outline => (
// 		{containerId, itemIds}: {
// 			containerId: Id,
// 			itemIds: Id[],
// 		},
// 	) => {

// 	const containerReport = outline.getReport<Item.Container>(containerId)

// 	const ids_to_move = ascertain_which_items_should_be_moved(
// 		outline,
// 		itemIds,
// 		containerReport,
// 	).map(report => report.item.id)

// 	// disconnect items from the tree
// 	outline.detach_item_from_tree(...ids_to_move)

// 	// prepend the items into the destination
// 	containerReport.item.children.unshift(...ids_to_move)
// })

