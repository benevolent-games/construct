
// import {Item} from "../../../types/item.js"
// import {OutlineAdmin} from "../../../model/admin.js"
// import {Id} from "../../../../../../tools/fresh_id.js"

// export function ascertain_which_items_should_be_moved(
// 		outline: OutlineAdmin,
// 		itemIds: Id[],
// 		targetReport: Item.Report,
// 	) {

// 	const destinationParentIds = targetReport.parents.map(p => p.id) ?? []
// 	const destinationContainer = targetReport.item.kind === "container"
// 		? targetReport.item
// 		: null

// 	const path_of_container_ids_to_destination = [
// 		...destinationParentIds,
// 		...(destinationContainer?.id ?? []),
// 	]

// 	const ids_of_folders_being_moved = outline.containers
// 		.filter(f => itemIds.includes(f.id))
// 		.map(f => f.id)

// 	const include_only_requested_items = (
// 		(report: Item.Report) => itemIds.includes(report.item.id)
// 	)

// 	const omit_items_whose_parents_are_already_selected = (
// 		(report: Item.Report) => !report.parents.some(
// 			parent => ids_of_folders_being_moved.includes(parent.id)
// 		)
// 	)

// 	const do_not_move_a_folder_into_itself = (
// 		(report: Item.Report) => (
// 			!path_of_container_ids_to_destination.includes(report.item.id)
// 		)
// 	)

// 	return outline.reports
// 		.filter(include_only_requested_items)
// 		.filter(omit_items_whose_parents_are_already_selected)
// 		.filter(do_not_move_a_folder_into_itself)
// }

