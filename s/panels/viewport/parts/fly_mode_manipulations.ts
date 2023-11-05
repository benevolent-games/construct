
import {Id} from "../../../tools/fresh_id.js"
import {Mover} from "../../../context/controllers/mover/controller.js"
import {Gesture} from "../../../context/controllers/gesture/controller.js"
import {Porthole} from "../../../context/controllers/world/porthole/porthole.js"

export const fly_mode_manipulations = (
		leafId: Id,
		gesture: Gesture,
		mover: Mover,
		porthole: Porthole,
	) => () => {

	const is_focal = () => gesture.focal.value?.leafId === leafId
	const is_pointer_locked = () => gesture.pointerLock.value?.leafId === leafId

	const disposers = [

		gesture.on.buttons.grab(input => {
			if (input.down && is_focal() && is_pointer_locked())
				mover.toggleGrab(porthole.camera)
		}),

		gesture.on.buttons.flycam(input => {
			if (input.down && is_focal()) {
				if (gesture.pointerLock.value || document.pointerLockElement)
					gesture.disengage_pointer_lock()
				else
					gesture.engage_pointer_lock({
						leafId,
						element: porthole.canvas,
					})
			}
		}),
	]

	return () => disposers.forEach(d => d())
}

