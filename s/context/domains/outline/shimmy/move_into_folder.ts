
import {State} from "../../../state.js"
import {make_outline_tools} from "../tools.js"
import {Id} from "../../../../tools/fresh_id.js"
import {Action} from "../../../framework/action_namespace.js"
import { ascertain_which_items_should_be_moved } from "./utils/reports_for_items_being_moved.js"

export const move_into_folder = Action.fast((state: State) => (
		{folderId, itemIds}: {
			folderId: Id,
			itemIds: Id[],
		},
	) => {

	const tools = make_outline_tools(state.outline)
	const destinationFolder = tools.getFolder(folderId)
	const targetReport = tools.reports.find(r => r.item.id === folderId)!

	const stuff_to_move = ascertain_which_items_should_be_moved(
		tools,
		itemIds,
		targetReport,
	)

	// delete all the items
	for (const {item, parent} of stuff_to_move)
		parent.children = (
			parent.children.filter(child => child.id !== item.id)
		)

	// insert all the items
	for (const {item} of stuff_to_move)
		destinationFolder.children.unshift(item)

})

