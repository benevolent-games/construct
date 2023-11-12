
import {State} from "../../state.js"
import {Spatial} from "./spatial.js"
import {Item} from "../outline/types.js"
import {Id} from "../../../tools/fresh_id.js"
import {make_outline_tools} from "./tools.js"
import {Action} from "../../framework/action_namespace.js"
import {move_into_folder} from "./shimmy/move_into_folder.js"
import {move_beside_another_item} from "./shimmy/move_beside_another_item.js"

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

	set_spatial: action(state => (...directives: {id: Id, spatial: Spatial}[]) => {
		const tools = make_outline_tools(state.outline)
		for (const {id, spatial} of directives) {
			const item = tools.getItem(id) as Item.Instance | Item.Light
			item.spatial = spatial
		}
	}),

	move_into_folder,
	move_above_another_item: move_beside_another_item("above"),
	move_below_another_item: move_beside_another_item("below"),
}))

