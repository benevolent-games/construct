
import {Flow, m} from "../parts/flow.js"
import {SelectionClicks} from "../aspects/selection_clicks.js"

export class NormalFlow extends Flow {
	modes = m(
		"plain",
		"history",
		"outline",
	)

	selectionClicks = new SelectionClicks(
		this.options.edcore.actions.outline,
		this.options.outline,
	)
}

