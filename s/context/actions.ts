
import {State} from "./state.js"
import {Action} from "./framework/action_namespace.js"
import {Id, Item, ItemReport} from "./domains/outline/types.js"
import {make_outline_tools} from "./domains/outline/tools.js"

export const actions = Action.specs<State>()(({action}) => ({

	add_items: action((state, additions: {
			item: Item.Whatever,
			folderId: Id,
		}[]) => {
		const tools = make_outline_tools(state.outline)
		for (const {folderId, item} of additions) {
			const folder = tools.getFolder(folderId)
			folder.children.unshift(item)
		}
	}),

	delete_items: action((state, ids: Id[]) => {
		const tools = make_outline_tools(state.outline)
		const reports = tools.reports.filter(report => ids.includes(report.item.id))
		for (const {item, parent} of reports)
			parent.children = (
				parent.children.filter(child => child.id !== item.id)
			)
	}),

	move_items_into_folder: action((state, {folderId, itemIds}: {
			folderId: Id,
			itemIds: Id[],
		}) => {

		const tools = make_outline_tools(state.outline)
		const destinationFolder = tools.getFolder(folderId)
		const destinationParentIds = tools.reports
			.find(r => r.item.id === folderId)
				?.parents.map(p => p.id)
					?? []

		const ids_of_folders_being_moved = tools.folders
			.filter(f => itemIds.includes(f.id))
			.map(f => f.id)

		const include_only_requested_items = (
			(report: ItemReport) => itemIds.includes(report.item.id)
		)

		const omit_items_whose_parents_are_already_selected = (
			(report: ItemReport) => !report.parents.some(
				parent => ids_of_folders_being_moved.includes(parent.id)
			)
		)

		const do_not_move_a_folder_into_itself = (
			(report: ItemReport) => (
				report.item.id !== destinationFolder.id &&
				!destinationParentIds.includes(report.item.id)
			)
		)

		const reports_for_items_being_moved = tools.reports
			.filter(include_only_requested_items)
			.filter(omit_items_whose_parents_are_already_selected)
			.filter(do_not_move_a_folder_into_itself)

		// delete all the items
		for (const {item, parent} of reports_for_items_being_moved)
			parent.children = (
				parent.children.filter(child => child.id !== item.id)
			)

		// insert all the items
		for (const {item} of reports_for_items_being_moved)
			destinationFolder.children.unshift(item)
	}),

	move_items_below_another_item: action((state, {targetItemId, itemIds}: {
			targetItemId: Id,
			itemIds: Id[],
		}) => {

		const tools = make_outline_tools(state.outline)
		const targetReport = tools.reports.find(r => r.item.id === targetItemId)!
		const targetIndex = targetReport.parent.children.indexOf(targetReport.item)
		const destinationParentIds = targetReport?.parents.map(p => p.id) ?? []

		const ids_of_folders_being_moved = tools.folders
			.filter(f => itemIds.includes(f.id))
			.map(f => f.id)

		const include_only_requested_items = (
			(report: ItemReport) => itemIds.includes(report.item.id)
		)

		const omit_items_whose_parents_are_already_selected = (
			(report: ItemReport) => !report.parents.some(
				parent => ids_of_folders_being_moved.includes(parent.id)
			)
		)

		const do_not_move_a_folder_into_itself = (
			(report: ItemReport) => !destinationParentIds.includes(report.item.id)
		)

		const reports_for_items_being_moved = tools.reports
			.filter(include_only_requested_items)
			.filter(omit_items_whose_parents_are_already_selected)
			.filter(do_not_move_a_folder_into_itself)

		// delete all the items
		for (const {item, parent} of reports_for_items_being_moved)
			parent.children = (
				parent.children.filter(child => child.id !== item.id)
			)

		// insert all the items
		targetReport.parent.children.splice(targetIndex + 1, 0, ...reports_for_items_being_moved.map(r => r.item))
	}),

}))

