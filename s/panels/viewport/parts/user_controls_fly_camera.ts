
import {setupFn} from "@benev/slate"
import {v2} from "@benev/toolbox/x/utils/v2.js"

import {axis} from "./axis.js"
import {LookVector} from "./look_vector.js"
import {Id} from "../../../tools/fresh_id.js"
import {World} from "../../../context/controllers/world/controller.js"
import {Gesture} from "../../../context/controllers/gesture/controller.js"
import {Porthole} from "../../../context/controllers/world/porthole/porthole.js"

export const user_controls_fly_camera = (
		leafId: Id,
		world: World,
		gesture: Gesture,
		porthole: Porthole,
		lookVector: LookVector,
	) => setupFn(() => world.onRender(() => {

	const this_leaf_is_not_focal = gesture.focal.value?.leafId !== leafId
	const this_leaf_is_pointer_locked = gesture.pointerLock.value?.leafId === leafId

	if (this_leaf_is_not_focal)
		return

	const {
		forward, backward, leftward, rightward,
		up, down, left, right,
	} = gesture.buttons

	porthole.add_move([
		axis(rightward, leftward),
		axis(forward, backward),
	])

	porthole.add_look(v2.multiplyBy([
		axis(right, left),
		axis(up, down),
	], 0.05))

	if (this_leaf_is_pointer_locked)
		porthole.add_look(lookVector.grab_and_reset())
}))

