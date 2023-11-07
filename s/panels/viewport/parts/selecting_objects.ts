
import {setupFn} from "@benev/slate"

import {PointerTracker} from "./pointer_tracker.js"
import {Tree} from "../../../context/controllers/tree/controller.js"
import {Gesture} from "../../../context/controllers/gesture/controller.js"
import {make_outline_tools} from "../../../context/domains/outline/tools.js"
import {Porthole} from "../../../context/controllers/world/porthole/porthole.js"

export const selecting_objects = (
		tree: Tree,
		gesture: Gesture,
		porthole: Porthole,
		pointerTracker: PointerTracker,
	) => setupFn(() => {

	return gesture.on.selectable.buttons.select(input => {
		const user_is_engaging_select_process = (
			input.down &&
			pointerTracker.canvasCoordinates
		)

		if (!user_is_engaging_select_process)
			return

		if (!pointerTracker.canvasCoordinates)
			return

		const id = porthole.pick_on_canvas(pointerTracker.canvasCoordinates)

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
	})
})

