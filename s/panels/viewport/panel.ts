
import {html} from "@benev/slate"
import {v2} from "@benev/toolbox/x/utils/v2.js"
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
			const axis = (a: boolean, b: boolean) => ((a ?1 :0) - (b ?1 :0))

			const fly = make_fly_camera({scene, position: [0, 0, -50]})
			const {camera} = fly

			function simulate() {
				if (input.is_leaf_focal(leafId)) {
					const {forward, backward, leftward, rightward} = input.tactic.buttons
					const {up, down, left, right} = input.tactic.buttons

					fly.add_move([
						axis(rightward, leftward),
						axis(forward, backward),
					])

					fly.add_look(v2.multiplyBy([
						axis(right, left),
						axis(up, down),
					], 0.05))
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

