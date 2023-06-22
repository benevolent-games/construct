
import "@benev/toolbox/x/html.js"
import {registerElements} from "@chasemoskal/magical"
import {BenevTheater} from "@benev/toolbox/x/babylon/theater/element.js"
import {make_fly_camera} from "@benev/toolbox/x/babylon/flycam/make_fly_camera.js"
import {integrate_nubs_to_control_fly_camera} from "@benev/toolbox/x/babylon/flycam/integrate_nubs_to_control_fly_camera.js"

import {Context} from "./components/context.js"
import {prepare_all_components} from "./components/prepare_all_components.js"

import {spawn_boxes} from "@benev/toolbox/x/demo/spawn_boxes.js"
import {spawn_light} from "@benev/toolbox/x/demo/spawn_light.js"
import {NubCauseEvent} from "@benev/nubs"
import {AbstractMesh, Color4, InstancedMesh, Mesh, Vector3} from "@babylonjs/core"
import {invert_y_axis} from "@benev/toolbox/x/babylon/flycam/utils/inversions.js"

const context = new Context()

registerElements(prepare_all_components(context))

const theater = document.querySelector<BenevTheater>("benev-theater")!
await theater.updateComplete

const {
	scene, start, resize, renderLoop
} = theater.babylon

const fly = make_fly_camera({scene, position: [0, 0, 0]})
integrate_nubs_to_control_fly_camera({
	fly,
	nub_context: theater.nubContext!,
	render_loop: renderLoop,
	look_sensitivity: {
		pointer: 1/700,
		stick: 1/50,
	},
	speeds_for_movement: {
		base: 0.7,
		fast: 1.5,
		slow: 0.2
	},
	speeds_for_looking_with_keys_and_stick: {
		base: 1,
		fast: 2,
		slow: 0.5
	},
})

spawn_light(scene, [0.11, 0.88, 0.44])
spawn_boxes(scene)


// selecting, tracking and highlighting meshes
let currentMesh: InstancedMesh | null
let id = 0
let shift_is_pressed = false
let key_D_is_pressed = false
let key_X_is_pressed = false

let move_enabled = false

const red = new Color4(1, 0, 0, 1)
const green = new Color4(0, 1, 0, 1)

function higlightCurrentMesh(prev?: Mesh | InstancedMesh) {

	if(prev) prev.disableEdgesRendering()

	if(currentMesh) {
		currentMesh.enableEdgesRendering()
		currentMesh.edgesWidth = 8
		currentMesh.edgesColor = currentMesh.isAnInstance ? green : red
	}
}

NubCauseEvent.target(window)
	.listen(({detail}) => {
		if (detail.kind === 'key' && detail.cause === 'Mouse1') {
			// pointer down
			if (detail.pressed) {
				const pick = scene.pick(scene.pointerX, scene.pointerY)
				if (pick.hit) {
					if (currentMesh) currentMesh?.disableEdgesRendering()
					currentMesh = pick.pickedMesh as unknown as InstancedMesh
					move_enabled = true
					// camera.detachControl()
					higlightCurrentMesh()
				}
				else {
					currentMesh?.disableEdgesRendering()
					currentMesh = null
				}
			}
			// pointer up
			else {
				// camera.attachControl(canvas, true)
				move_enabled = false
			}
		}

		// pointer move
		if (currentMesh && move_enabled) {
			if (detail.kind === 'pointer') {
				const [x, y] = invert_y_axis(detail.movement)
				const newPos = new Vector3(x / 10, y / 10, 0)
				currentMesh?.position.addInPlace(newPos)
			}
		}


		if (detail.kind === "key" && detail.cause.startsWith("Shift")) {
			shift_is_pressed = detail.pressed
		}

		if (detail.kind === "key" && detail.cause === "KeyW") {
			key_D_is_pressed = detail.pressed
		}

		if (detail.kind === "key" && detail.cause === "KeyX") {
			key_X_is_pressed = detail.pressed
		}

		if (shift_is_pressed && key_D_is_pressed && currentMesh) {
			const prev = currentMesh
			const prevPos = prev.position
			const newMeshInstance = currentMesh?.createInstance(`${id}dsd`)
			newMeshInstance.position = new Vector3(prevPos.x, prevPos.y + 5, prevPos.z)
			currentMesh = newMeshInstance
			higlightCurrentMesh(prev)
			shift_is_pressed = false
			key_D_is_pressed = false
			id++
		}

		if (shift_is_pressed && key_X_is_pressed && currentMesh) {
			if (currentMesh.isAnInstance) {
				currentMesh.dispose(false)
			}
		}
})


resize(100)
start()


console.log("🎨")

