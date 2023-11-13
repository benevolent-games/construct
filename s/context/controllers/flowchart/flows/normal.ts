
import {Flow, m} from "../parts/flow.js"
import {Id} from "../../../../tools/fresh_id.js"
import {SelectionClicks} from "../aspects/selection_clicks.js"

export class NormalFlow extends Flow {
	modes = m(
		"plain",
		"history",
		"outline",
	)

	selectionClicks = new SelectionClicks(
		this.options.edcore,
		this.options.outline,
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

