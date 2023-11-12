
import {Flow, m} from "../parts/types.js"
import {Id} from "../../../../tools/fresh_id.js"

export class NormalFlow extends Flow {
	modes = m(
		"plain",
		"history",
		"selectable",
	)

	user_clicked_to_select_item_in_viewport(id: Id | null) {
		const {tree, outline} = this.options

		if (id) {
			if (outline.isSelected(id))
				tree.actions.outline.deselect(id)
			else
				tree.actions.outline.select(id)
		}
		else
			tree.actions.outline.clear_selection()
	}
}

