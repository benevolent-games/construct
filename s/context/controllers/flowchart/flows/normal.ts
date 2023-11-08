
import {Flow, m} from "../parts/types.js"
import {Id} from "../../../../tools/fresh_id.js"
import {make_outline_tools} from "../../../domains/outline/tools.js"

export class NormalFlow extends Flow {
	modes = m(
		"plain",
		"history",
		"selectable",
	)

	user_clicked_to_select_item_in_viewport(id: Id | null) {
		const {tree} = this.options

		if (id) {
			const tools = make_outline_tools(tree.state.outline)
			const item = tools.getItem(id)
			if (item.selected)
				tree.actions.items.deselect(id)
			else
				tree.actions.items.select(id)
		}
		else
			tree.actions.items.clear_selection()
	}
}

