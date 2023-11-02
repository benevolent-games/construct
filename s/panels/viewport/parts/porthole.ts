
import {Initiator} from "@benev/slate"
import {v2} from "@benev/toolbox/x/utils/v2.js"
import {EngineView} from "@babylonjs/core/Engines/Extensions/engine.views.js"
import {make_fly_camera} from "@benev/toolbox/x/babylon/flycam/make_fly_camera.js"

import {Id} from "../../../tools/fresh_id.js"
import {Babylon} from "../../../context/controllers/babylon/babylon.js"
import {InputController} from "../../../context/controllers/input/controller.js"

export class Porthole extends Initiator {
	canvas: HTMLCanvasElement
	view: EngineView
	fly: ReturnType<typeof make_fly_camera>

	get camera() {
		return this.fly.camera
	}

	constructor(
			public leafId: Id,
			public babylon: Babylon,
			public input: InputController,
		) {

		super()

		this.canvas = document.createElement("canvas")

		this.fly = make_fly_camera({
			scene: babylon.scene,
			position: [0, 0, -50],
		})

		babylon.renderLoop.add(this.#simulate)
		babylon.scene.addCamera(this.fly.camera)

		this.view = babylon.engine.registerView(
			this.canvas,
			this.fly.camera,
		)
	}

	#simulate = () => {
		const {input, leafId, fly} = this

		if (!input.is_leaf_focal(leafId))
			return

		const {forward, backward, leftward, rightward} =
			input.tactic.buttons

		const {up, down, left, right} =
			input.tactic.buttons

		fly.add_move([
			axis(rightward, leftward),
			axis(forward, backward),
		])

		fly.add_look(v2.multiplyBy([
			axis(right, left),
			axis(up, down),
		], 0.05))
	}

	dispose() {
		this.babylon.renderLoop.delete(this.#simulate)
		this.fly.dispose()
		this.babylon.engine.unRegisterView(this.canvas)
	}
}

function axis(a: boolean, b: boolean) {
	return ((a ?1 :0) - (b ?1 :0))
}

