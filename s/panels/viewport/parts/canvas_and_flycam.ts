
import {v2} from "@benev/toolbox/x/utils/v2.js"
import {make_fly_camera} from "@benev/toolbox/x/babylon/flycam/make_fly_camera.js"

import {Id} from "../../../tools/fresh_id.js"
import {start_resizing} from "./start_resizing.js"
import {Babylon} from "../../../context/controllers/babylon/babylon.js"
import {InputController} from "../../../context/controllers/input/controller.js"

export const canvas_and_flycam = (
		leafId: Id,
		babylon: Babylon,
		input: InputController,
	) => () => {

	const {scene, engine} = babylon

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

	babylon.renderLoop.add(simulate)
	scene.addCamera(camera)
	const stop_resizing = start_resizing(canvas)
	const view = engine.registerView(canvas, camera)

	const dispose = () => {
		babylon.renderLoop.delete(simulate)
		fly.dispose()

		engine.unRegisterView(canvas)
		camera.dispose()
		stop_resizing()
	}

	return [{
		view,
		canvas,
		camera,
	}, dispose] satisfies [any, () => void]
}

