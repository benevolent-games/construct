
import {html} from "@benev/slate"

import {styles} from "./styles.js"
import {slate} from "../../context/slate.js"
import {PanelProps, panel} from "../panel_parts.js"
import {sprite_box} from "../../sprites/groups/feather/box.js"
import {canvas_and_flycam} from "./parts/canvas_and_flycam.js"
import {pointer_movements_and_buttons} from "./parts/pointer_movements_and_buttons.js"

export const ViewportPanel = panel({
	label: "viewport",
	icon: sprite_box,
	view: slate.obsidian({name: "viewport", styles},
		use => ({leafId}: PanelProps) => {

		const {babylon, input} = use.context

		const {canvas, camera} = use.init(canvas_and_flycam(
			leafId,
			babylon,
			input,
		))

		use.setup(pointer_movements_and_buttons(
			use.context,
			canvas,
			camera,
		))

		function lock(event: MouseEvent) {
			if (!document.pointerLockElement) {
				const container = event.currentTarget as HTMLElement
				container.requestPointerLock()
				input.pointerLock.value = {leafId}
			}
		}

		function contextmenu(event: MouseEvent) {
			event.preventDefault()
			lock(event)
		}

		return html`
			<div class=container @contextmenu="${contextmenu}">
				${canvas}
			</div>
		`
	}),
})

