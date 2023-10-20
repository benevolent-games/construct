
import {html} from "@benev/slate"

import {styles} from "./styles.js"
import {tile} from "../tile_parts.js"
import {obsidian} from "../../context/context.js"
import {sprite_box} from "../../sprites/groups/feather/box.js"

import {Vector3} from "@babylonjs/core/Maths/math.js"
import {start_resizing} from "./parts/start_resizing.js"
import {TargetCamera} from "@babylonjs/core/Cameras/targetCamera.js"

let cam_count = 0

export const ViewportTile = tile({
	label: "viewport",
	icon: sprite_box,
	view: obsidian({name: "viewport", styles}, use => () => {
		const {scene, engine, box} = use.context.babylon

		const {canvas} = use.init(() => {
			const canvas = document.createElement("canvas")
			const camera = new TargetCamera(
				`cam_${cam_count++}`,
				new Vector3(Math.random() * 5, 0, 0),
				scene,
			)

			const stop_resizing = start_resizing(canvas)
			camera.setTarget(box.position)
			scene.addCamera(camera)
			engine.registerView(canvas, camera)

			return [{canvas, camera}, () => {
				engine.unRegisterView(canvas)
				camera.dispose()
				stop_resizing()
			}]
		})

		return html`
			${canvas}
		`
	}),
})

