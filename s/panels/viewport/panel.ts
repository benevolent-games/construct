
import {html, initiate} from "@benev/slate"

import {styles} from "./styles.js"
import {slate} from "../../context/slate.js"
import {Porthole} from "./parts/porthole.js"
import {PanelProps, panel} from "../panel_parts.js"
import {start_resizing} from "./parts/start_resizing.js"
import {PointerTracker} from "./parts/pointer_tracker.js"
import {selecting_objects} from "./parts/selecting_objects.js"
import {sprite_box} from "../../sprites/groups/feather/box.js"
import {fly_mode_manipulations} from "./parts/fly_mode_manipulations.js"

export const ViewportPanel = panel({
	label: "viewport",
	icon: sprite_box,
	view: slate.obsidian({name: "viewport", styles},
		use => ({leafId}: PanelProps) => {

		const {babylon, gesture, mover} = use.context

		const porthole = use.init(initiate(Porthole)(
			leafId,
			babylon,
			gesture,
		))

		use.setup(() => start_resizing(porthole.canvas))

		const pointerTracker = use.init(initiate(PointerTracker)(
			use.context.gesture.pointerMovements,
			porthole.canvas,
		))

		use.setup(selecting_objects(
			use.context,
			porthole.canvas,
			porthole.camera,
			pointerTracker,
		))

		use.setup(fly_mode_manipulations(
			leafId,
			gesture,
			mover,
			porthole,
		))

		return html`
			<div class=container>
				${porthole.canvas}
			</div>
		`
	}),
})

