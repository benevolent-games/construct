
import {mountFn} from "@benev/slate"

import {PointerTracker} from "./pointer_tracker.js"
import {Gesture} from "../../../context/controllers/gesture/controller.js"
import {Flowchart} from "../../../context/controllers/flowchart/controller.js"
import {Porthole} from "../../../context/controllers/world/porthole/porthole.js"

export const selecting_objects = (
		flowchart: Flowchart,
		gesture: Gesture,
		porthole: Porthole,
		pointerTracker: PointerTracker,
	) => mountFn(() => {

	return gesture.on.outline.buttons.select(input => {
		flowchart.handle("NormalFlow", flow => {
			const user_is_engaging_select_process = (
				input.down &&
				pointerTracker.canvasCoordinates
			)

			if (!user_is_engaging_select_process)
				return

			if (!pointerTracker.canvasCoordinates)
				return

			const id = porthole.pick_on_canvas(pointerTracker.canvasCoordinates)
			flow.selectionClicks.click_item_in_viewport(id)
		})
	})
})

