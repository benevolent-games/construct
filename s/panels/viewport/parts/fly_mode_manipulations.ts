
import {mountFn} from "@benev/slate"

import {Id} from "../../../tools/fresh_id.js"
import {Mover} from "../../../context/controllers/world/mover/mover.js"
import {Gesture} from "../../../context/controllers/gesture/controller.js"
import {Flowchart} from "../../../context/controllers/flowchart/controller.js"
import {Porthole} from "../../../context/controllers/world/porthole/porthole.js"
import { Input } from "../../../tools/impulse/input.js"

export const fly_mode_manipulations = (
		leafId: Id,
		gesture: Gesture,
		flowchart: Flowchart,
		// mover: Mover,
		// porthole: Porthole,
		canvas: HTMLCanvasElement,
	) => mountFn(() => {

	const is_focal = () => gesture.focal.value?.leafId === leafId
	const is_pointer_locked = () => gesture.pointerLock.value?.leafId === leafId

	const on_exit_flycam = (input: Input.Button) => {
		if (input.down && is_focal() && (gesture.pointerLock.value || document.pointerLockElement)) {
			gesture.disengage_pointer_lock()
			flowchart.assign("NormalFlow")
		}
	}

	// TODO better integrate flowchart, replace mover

	const disposers = [
		// gesture.on.flycam.buttons.grab(input => {
		// 	if (input.down && is_focal() && is_pointer_locked())
		// 		mover.toggleGrab(porthole)
		// }),

		gesture.on.plain.buttons.enter_flycam(input => {
			if (input.down && is_focal()) {
				flowchart.assign("FlycamFlow", 234)
				gesture.engage_pointer_lock({
					leafId,
					element: canvas,
				})
				// if (gesture.pointerLock.value || document.pointerLockElement)
				// 	gesture.disengage_pointer_lock()
				// else {
				// 	gesture.engage_pointer_lock({
				// 		leafId,
				// 		element: canvas,
				// 	})
				// }
			}
		}),

		gesture.on.flycam.buttons.exit_flycam(on_exit_flycam),
		gesture.on.flycam_grabbed.buttons.exit_flycam(on_exit_flycam),

		gesture.on_pointer_lock_disengaged(() => {
			const noop = () => {}
			const back_to_normal = () => flowchart.assign("NormalFlow")
			flowchart.handle_all_flows({
				NormalFlow: noop,
				FlycamFlow: back_to_normal,
				FlycamGrabbingFlow: back_to_normal,
			})

			// // TODO move into flow
			// mover.ungrab()
		}),
	]

	return () => disposers.forEach(d => d())
})

