
import {html, initiate} from "@benev/slate"

import {styles} from "./styles.js"
import {slate} from "../../context/slate.js"
import {Porthole} from "./parts/porthole.js"
import {PanelProps, panel} from "../panel_parts.js"
import {start_resizing} from "./parts/start_resizing.js"
import {PointerTracker} from "./parts/pointer_tracker.js"
import {SelectingObjects} from "./parts/selecting_objects.js"
import {sprite_box} from "../../sprites/groups/feather/box.js"

export const ViewportPanel = panel({
	label: "viewport",
	icon: sprite_box,
	view: slate.obsidian({name: "viewport", styles},
		use => ({leafId}: PanelProps) => {

		const {babylon, input} = use.context

		const porthole = use.init(initiate(Porthole)(
			leafId,
			babylon,
			input,
		))

		use.setup(() => start_resizing(porthole.canvas))

		const pointerTracker = use.init(initiate(PointerTracker)(
			use.context.input.pointerMovements,
			porthole.canvas,
		))

		use.init(initiate(SelectingObjects)(
			use.context,
			babylon.scene,
			porthole.canvas,
			porthole.camera,
			pointerTracker,
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
				${porthole.canvas}
			</div>
		`
	}),
})

