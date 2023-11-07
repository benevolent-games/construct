
import {setupFn} from "@benev/slate"

import {Id} from "../../../tools/fresh_id.js"
import {Mover} from "../../../context/controllers/world/mover/mover.js"
import {Gesture} from "../../../context/controllers/gesture/controller.js"
import {Porthole} from "../../../context/controllers/world/porthole/porthole.js"

export const fly_mode_manipulations = (
		leafId: Id,
		gesture: Gesture,
		mover: Mover,
		porthole: Porthole,
		canvas: HTMLCanvasElement,
	) => setupFn(() => {

	const is_focal = () => gesture.focal.value?.leafId === leafId
	const is_pointer_locked = () => gesture.pointerLock.value?.leafId === leafId

	const disposers = [
		gesture.on.flycam.buttons.grab(input => {
			if (input.down && is_focal() && is_pointer_locked())
				mover.toggleGrab(porthole)
		}),

		gesture.on.plain.buttons.enter_flycam(input => {
			if (input.down && is_focal()) {
				if (gesture.pointerLock.value || document.pointerLockElement)
					gesture.disengage_pointer_lock()
				else
					gesture.engage_pointer_lock({
						leafId,
						element: canvas,
					})
			}
		}),

		gesture.on_pointer_lock_disengaged(() => {
			mover.ungrab()
		}),
	]

	return () => disposers.forEach(d => d())
})

