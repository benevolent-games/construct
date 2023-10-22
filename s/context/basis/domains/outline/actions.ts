
import {AppState} from "../../app_state.js"
import {actions} from "../../parts/actions.js"
import {ItemChange} from "../../../controllers/graphliner/parts/types.js"
import { make_outline_tools } from "./tools.js"

export const outline_actions = () => actions<AppState>()(({action}) => ({
	add: action({
		make_action: (...changes: ItemChange[]) => ({changes}),
		mutate_state: (state, {changes}) => {
			const tools = make_outline_tools(state.outline)
			for (const {folderId, item} of changes) {
				const folder = tools.getFolder(folderId)
				folder.children.push(item)
			}
			return state
		},
	}),
	delete: action({
		make_action: (...changes: ItemChange[]) => ({changes}),
		mutate_state: (state, {changes}) => {
			const tools = make_outline_tools(state.outline)
			for (const {folderId, item} of changes) {
				const folder = tools.getFolder(folderId)
				folder.children = (
					folder.children.filter(child => child.id !== item.id)
				)
			}
			return state
		},
	}),
	// lol: insta(state => (action: {changes: ItemChange}) => {
	//
	// }),
}))

