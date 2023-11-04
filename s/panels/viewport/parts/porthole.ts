
import {Initiator} from "@benev/slate"
import {V2, v2} from "@benev/toolbox/x/utils/v2.js"
import {EngineView} from "@babylonjs/core/Engines/Extensions/engine.views.js"
import {make_fly_camera} from "@benev/toolbox/x/babylon/flycam/make_fly_camera.js"

import {Id} from "../../../tools/fresh_id.js"
import {Babylon} from "../../../context/controllers/babylon/babylon.js"
import {Gesture} from "../../../context/controllers/gesture/controller.js"

export class Porthole extends Initiator {
	canvas: HTMLCanvasElement
	view: EngineView
	fly: ReturnType<typeof make_fly_camera>
	disposers = new Set<() => void>()

	#look = (() => {
		let look = v2.zero()
		const sensitivity = 0.001
		const invert: V2 = [1, -1]

		function add(more: V2) {
			look = v2.add(look, more)
		}

		function grab() {
			const vector = look
			look = v2.zero()
			return v2.multiplyBy(
				v2.multiply(vector, invert),
				sensitivity,
			)
		}

		return {add, grab}
	})()

	get camera() {
		return this.fly.camera
	}

	constructor(
			public leafId: Id,
			public babylon: Babylon,
			public gesture: Gesture,
		) {

		super()

		this.canvas = document.createElement("canvas")

		const disposeLook = gesture.on.vectors.look(input => {
			this.#look.add(input.vector)
		})

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

		this.disposers
			.add(disposeLook)
			.add(this.fly.dispose)
			.add(() => babylon.renderLoop.delete(this.#simulate))
			.add(() => this.babylon.engine.unRegisterView(this.canvas))
	}

	#simulate = () => {
		const {gesture, leafId, fly} = this
		const this_leaf_is_not_focal = gesture.focal.value?.leafId !== leafId
		const this_leaf_is_pointer_locked = gesture.pointerLock.value?.leafId === leafId

		if (this_leaf_is_not_focal)
			return

		const {
			forward, backward, leftward, rightward,
			up, down, left, right,
		} = gesture.buttons

		fly.add_move([
			axis(rightward, leftward),
			axis(forward, backward),
		])

		fly.add_look(v2.multiplyBy([
			axis(right, left),
			axis(up, down),
		], 0.05))

		if (this_leaf_is_pointer_locked)
			fly.add_look(this.#look.grab())
	}

	dispose() {
		for (const dispose of this.disposers)
			dispose()
	}
}

function axis(a: boolean, b: boolean) {
	return ((a ?1 :0) - (b ?1 :0))
}

