
import {Flow, m} from "../parts/types.js"
import {Id} from "../../../../tools/fresh_id.js"

export class NormalFlow extends Flow {
	modes = m(
		"plain",
		"history",
		"selectable",
	)

	user_clicked_to_select_item_in_viewport(id: Id | null) {
		const {edcore, outline} = this.options

		if (id) {
			if (outline.isSelected(id))
				edcore.actions.outline.deselect(id)
			else
				edcore.actions.outline.select(id)
		}
		else
			edcore.actions.outline.clear_selection()
	}
}

