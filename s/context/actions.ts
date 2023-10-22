
import {State} from "./state.js"
import {ItemChange} from "./domains/outline/types.js"
import {Action} from "./framework/action_namespace.js"
import {make_outline_tools} from "./domains/outline/tools.js"

export const actions = Action.specs<State>()(({action}) => ({

	add_item: action((state, payload: {changes: ItemChange[]}) => {
		const tools = make_outline_tools(state.outline)
		for (const {folderId, item} of payload.changes) {
			const folder = tools.getFolder(folderId)
			folder.children.push(item)
		}
	}),

	delete_item: action((state, payload: {changes: ItemChange[]}) => {
		const tools = make_outline_tools(state.outline)
		for (const {folderId, item} of payload.changes) {
			const folder = tools.getFolder(folderId)
			folder.children = (
				folder.children.filter(child => child.id !== item.id)
			)
		}
	}),

}))

