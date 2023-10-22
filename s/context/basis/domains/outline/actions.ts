
import {AppState} from "../../app_state.js"
import {make_outline_tools} from "./tools.js"
import {actions} from "../../parts/actions.js"
import {ItemChange} from "../../../controllers/graphliner/parts/types.js"

export const outline_actions = () => actions<AppState>()(({action}) => ({

	add: action((state, payload: {changes: ItemChange[]}) => {
		const tools = make_outline_tools(state.outline)
		for (const {folderId, item} of payload.changes) {
			const folder = tools.getFolder(folderId)
			folder.children.push(item)
		}
	}),

	delete: action((state, payload: {changes: ItemChange[]}) => {
		const tools = make_outline_tools(state.outline)
		for (const {folderId, item} of payload.changes) {
			const folder = tools.getFolder(folderId)
			folder.children = (
				folder.children.filter(child => child.id !== item.id)
			)
		}
	}),

}))

