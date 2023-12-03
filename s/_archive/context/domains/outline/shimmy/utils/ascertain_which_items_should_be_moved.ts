
import {Item} from "../../types.js"
import {Id} from "../../../../../tools/fresh_id.js"
import {OutlineGenius} from "../../../../controllers/outline_genius/controller.js"

export function ascertain_which_items_should_be_moved(
		outline: OutlineGenius,
		itemIds: Id[],
		targetReport: Item.Report,
	) {

	const destinationParentIds = targetReport.parents.map(p => p.id) ?? []
	const destinationFolder = targetReport.item.kind === "folder"
		? targetReport.item
		: null

	const ids_of_folders_being_moved = outline.folders
		.filter(f => itemIds.includes(f.id))
		.map(f => f.id)

	const include_only_requested_items = (
		(report: Item.Report) => itemIds.includes(report.item.id)
	)

	const omit_items_whose_parents_are_already_selected = (
		(report: Item.Report) => !report.parents.some(
			parent => ids_of_folders_being_moved.includes(parent.id)
		)
	)

	const do_not_move_a_folder_into_itself = (
		(report: Item.Report) => (
			(!destinationParentIds.includes(report.item.id)) &&
			(destinationFolder
				? (report.item.id !== destinationFolder.id)
				: true)
		)
	)

	return outline.reports
		.filter(include_only_requested_items)
		.filter(omit_items_whose_parents_are_already_selected)
		.filter(do_not_move_a_folder_into_itself)
}

