
import {html, initiator} from "@benev/slate"

import {icon_akar_point} from "../../icons/groups/akar/point.js"

import {styles} from "./styles.js"
import {axis} from "./parts/axis.js"
import {slate} from "../../context/slate.js"
import {v2} from "@benev/toolbox/x/utils/v2.js"
import {LookVector} from "./parts/look_vector.js"
import {PanelProps, panel} from "../panel_parts.js"
import {PointerTracker} from "./parts/pointer_tracker.js"
import {selecting_objects} from "./parts/selecting_objects.js"
import {icon_feather_box} from "../../icons/groups/feather/box.js"
import {canvas_with_resizing} from "./parts/canvas_with_resizing.js"
import {fly_mode_manipulations} from "./parts/fly_mode_manipulations.js"

export const ViewportPanel = panel({
	label: "viewport",
	icon: icon_feather_box,
	view: slate.obsidian({name: "viewport", styles},
		use => ({leafId}: PanelProps) => {

		const {tree, gesture, world} = use.context

		const canvas = use.init(canvas_with_resizing)

		const porthole = use.init(() => initiator(
			world.make_porthole(leafId, canvas))
		)

		const pointerTracker = use.init(() => initiator(
			new PointerTracker(
				use.context.gesture.pointerMovements,
				canvas,
			))
		)

		use.setup(selecting_objects(
			tree,
			gesture,
			porthole,
			pointerTracker,
		))

		const lookVector = use.init(() => {
			let lookVector = new LookVector({
				sensitivity: 1 / 1000,
				invertX: false,
				invertY: false,
			})
			return [
				lookVector,
				gesture.on.vectors.look(
					input => lookVector.accumulate(input.vector)
				),
			]
		})

		use.setup(() => world.onRender(() => {
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

		use.setup(fly_mode_manipulations(
			leafId,
			gesture,
			world.mover,
			porthole,
			canvas,
		))

		const is_pointer_locked = (
			gesture.pointerLock.value?.leafId === leafId
		)

		return html`
			<div class=container ?data-pointer-locked=${is_pointer_locked}>
				${canvas}
				${icon_akar_point}
			</div>
		`
	}),
})

