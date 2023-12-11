
import {html, initiator} from "@benev/slate"

import {icon_akar_point} from "../../icons/groups/akar/point.js"

import {styles} from "./styles.js"
import {slate} from "../../context/slate.js"
import {PanelProps, panel} from "../panel_parts.js"
import {PointerTracker} from "./parts/pointer_tracker.js"
import {selecting_objects} from "./parts/selecting_objects.js"
import {icon_feather_box} from "../../icons/groups/feather/box.js"
import {look_vector_wired_for_inputs} from "./parts/look_vector.js"
import {canvas_with_resizing} from "./parts/canvas_with_resizing.js"
import {fly_mode_manipulations} from "./parts/fly_mode_manipulations.js"
import {user_controls_fly_camera} from "./parts/user_controls_fly_camera.js"

export const ViewportPanel = panel({
	label: "viewport",
	icon: icon_feather_box,
	view: slate.shadow_view(use => ({leafId}: PanelProps) => {
		use.styles(styles)
		use.name("viewport")
		const {flowchart, gesture, world} = use.context

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

		use.mount(selecting_objects(
			flowchart,
			gesture,
			porthole,
			pointerTracker,
		))

		const lookVector = use.init(look_vector_wired_for_inputs(gesture))

		use.mount(user_controls_fly_camera(
			leafId,
			world,
			gesture,
			porthole,
			lookVector,
		))

		use.mount(fly_mode_manipulations(
			leafId,
			gesture,
			flowchart,
			// world.mover,
			// porthole,
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

