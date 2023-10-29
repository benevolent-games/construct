
import {html} from "@benev/slate"
import {make_fly_camera} from "@benev/toolbox/x/babylon/flycam/make_fly_camera.js"

import {styles} from "./styles.js"
import {slate} from "../../context/slate.js"
import {PanelProps, panel} from "../panel_parts.js"
import {start_resizing} from "./parts/start_resizing.js"
import {sprite_box} from "../../sprites/groups/feather/box.js"

export const ViewportPanel = panel({
	label: "viewport",
	icon: sprite_box,
	view: slate.obsidian({name: "viewport", styles}, use => ({leafId}: PanelProps) => {
		const {input} = use.context
		const {scene, engine} = use.context.babylon

		const {canvas} = use.init(() => {
			const canvas = document.createElement("canvas")

			const fly = make_fly_camera({scene, position: [0, 0, -50]})
			const {camera} = fly

			function simulate() {
				if (input.is_leaf_focal(leafId)) {
					const {forward, backward, leftward, rightward} = input.tactic.buttons
					fly.add_move([
						(rightward.input.value?.down ? 1 : 0)
							- (leftward.input.value?.down ? 1 : 0),
						(forward.input.value?.down ? 1 : 0)
							- (backward.input.value?.down ? 1 : 0),
					])
				}
			}

			use.context.renderLoop.add(simulate)
			scene.addCamera(camera)
			const stop_resizing = start_resizing(canvas)
			const view = engine.registerView(canvas, camera)

			return [{view, canvas, camera}, () => {
				use.context.renderLoop.delete(simulate)
				fly.dispose()

				engine.unRegisterView(canvas)
				camera.dispose()
				stop_resizing()
			}]
		})

		function lock(event: MouseEvent) {
			const container = event.currentTarget as HTMLElement
			container.requestPointerLock()
			input.pointerLock.value = {leafId}
		}

		return html`
			<div class=container @click="${lock}">
				${canvas}
			</div>
		`
	}),
})

