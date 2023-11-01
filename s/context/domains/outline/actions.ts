
import {State} from "../../state.js"
import {Item} from "../outline/types.js"
import {Id} from "../../../tools/fresh_id.js"
import {make_outline_tools} from "./tools.js"
import {Action} from "../../framework/action_namespace.js"
import { V3 } from "@benev/toolbox/x/utils/v3.js"

export const items = Action.specs<State>()(({action}) => ({
	add: action(state => (additions: {
			item: Item.Whatever,
			folderId: Id,
		}[]) => {
		const tools = make_outline_tools(state.outline)
		for (const {folderId, item} of additions) {
			const folder = tools.getFolder(folderId)
			folder.children.unshift(item)
		}
	}),

	delete: action(state => (...ids: Id[]) => {
		const tools = make_outline_tools(state.outline)
		const reports = tools.reports.filter(report => ids.includes(report.item.id))
		for (const {item, parent} of reports)
			parent.children = (
				parent.children.filter(child => child.id !== item.id)
			)
	}),

	select: action(state => (...ids: Id[]) => {
		const tools = make_outline_tools(state.outline)
		const items = tools.items.filter(item => ids.includes(item.id))
		for (const item of items)
			item.selected = true
	}),

	deselect: action(state => (...ids: Id[]) => {
		const tools = make_outline_tools(state.outline)
		const items = tools.items.filter(item => ids.includes(item.id))
		for (const item of items)
			item.selected = false
	}),

	clear_selection: action(state => () => {
		const tools = make_outline_tools(state.outline)
		for (const item of tools.items)
			item.selected = false
	}),

	show: action(state => (...ids: Id[]) => {
		const tools = make_outline_tools(state.outline)
		const items = [state.outline, ...tools.items].filter(item => ids.includes(item.id))
		for (const item of items)
			item.visible = true
	}),

	hide: action(state => (...ids: Id[]) => {
		const tools = make_outline_tools(state.outline)
		const items = [state.outline, ...tools.items].filter(item => ids.includes(item.id))
		for (const item of items)
			item.visible = false
	}),

	set_position: action(state => (...directives: {id: Id, position: V3}[]) => {
		const tools = make_outline_tools(state.outline)
		for (const {id, position} of directives) {
			const item = tools.getItem(id) as Item.Instance | Item.Light
			item.spatial.position = position
		}
	}),

	move_into_folder: action(state => ({folderId, itemIds}: {
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
			(report: Item.Report) => itemIds.includes(report.item.id)
		)

		const omit_items_whose_parents_are_already_selected = (
			(report: Item.Report) => !report.parents.some(
				parent => ids_of_folders_being_moved.includes(parent.id)
			)
		)

		const do_not_move_a_folder_into_itself = (
			(report: Item.Report) => (
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

	move_below_another_item: action(state => ({targetItemId, itemIds}: {
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
			(report: Item.Report) => itemIds.includes(report.item.id)
		)

		const omit_items_whose_parents_are_already_selected = (
			(report: Item.Report) => !report.parents.some(
				parent => ids_of_folders_being_moved.includes(parent.id)
			)
		)

		const do_not_move_a_folder_into_itself = (
			(report: Item.Report) => !destinationParentIds.includes(report.item.id)
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

