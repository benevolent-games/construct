
import {State} from "./state.js"
import {Id, Item, ItemChange} from "./domains/outline/types.js"
import {Action} from "./framework/action_namespace.js"
import {make_outline_tools} from "./domains/outline/tools.js"

export const actions = Action.specs<State>()(({action}) => ({

	add_items: action((state, additions: {
			item: Item.Whatever,
			folderId: Id,
		}[]) => {
		const tools = make_outline_tools(state.outline)
		for (const {folderId, item} of additions) {
			const folder = tools.getFolder(folderId)
			folder.children.push(item)
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

}))

