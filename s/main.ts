
import "@benev/toolbox/x/html.js"

import "@babylonjs/core/Culling/ray.js"
import "@babylonjs/core/Rendering/edgesRenderer.js"

import {NubCauseEvent} from "@benev/nubs"
import {Mesh} from "@babylonjs/core/Meshes/mesh.js"
import {registerElements} from "@chasemoskal/magical"
import {Color4} from "@babylonjs/core/Maths/math.color.js"
import {Vector3} from "@babylonjs/core/Maths/math.vector.js"
import {spawn_light} from "@benev/toolbox/x/demo/spawn_light.js"
import {InstancedMesh} from "@babylonjs/core/Meshes/instancedMesh.js"
import {BenevTheater} from "@benev/toolbox/x/babylon/theater/element.js"
import {invert_y_axis} from "@benev/toolbox/x/babylon/flycam/utils/inversions.js"
import {make_fly_camera} from "@benev/toolbox/x/babylon/flycam/make_fly_camera.js"
import {integrate_nubs_to_control_fly_camera} from "@benev/toolbox/x/babylon/flycam/integrate_nubs_to_control_fly_camera.js"

import {make_box} from "./tools/make-box.js"
import {Context} from "./components/context.js"
import {prepare_all_components} from "./components/prepare_all_components.js"

const context = new Context()
registerElements(prepare_all_components(context))

const theater = document.querySelector<BenevTheater>("benev-theater")!
await (theater.updateComplete)

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

const world = context.folders.value
const box = make_box(scene)
world.originals = [...world.originals, {id: "box", mesh: box, name: "box"}]

const inst = box.createInstance("box_instance")
world.add_object({id: "box_instance", mesh: inst, name: "box_instance"})

// selecting, tracking and highlighting meshes
let currentMesh: InstancedMesh | null
let id = 0
let shift_is_pressed = false
let key_W_is_pressed = false
let key_X_is_pressed = false

let move_enabled = false

const red = new Color4(1, 0, 0, 1)
const green = new Color4(0, 1, 0, 1)

function higlightCurrentMesh(prev?: InstancedMesh) {
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
				if (pick?.hit) {
					if (currentMesh) currentMesh?.disableEdgesRendering()
					currentMesh = pick.pickedMesh as unknown as InstancedMesh
					move_enabled = true
					higlightCurrentMesh()
				}
				else {
					currentMesh?.disableEdgesRendering()
					currentMesh = null
				}
			}
			// pointer up
			else {
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
			key_W_is_pressed = detail.pressed
		}

		if (detail.kind === "key" && detail.cause === "KeyX") {
			key_X_is_pressed = detail.pressed
		}

		if (shift_is_pressed && key_W_is_pressed && currentMesh) {
			const prev = currentMesh
			const prevPos = prev.position
			const instance_name = `instance${id}`
			const newMeshInstance = currentMesh?.createInstance(instance_name)
			newMeshInstance.position = new Vector3(prevPos.x, prevPos.y + 3, prevPos.z)
			currentMesh = newMeshInstance

			world.instances = [
				...world.instances,
				{
					id: instance_name,
					mesh: newMeshInstance,
					name: instance_name
				}
			]

			higlightCurrentMesh(prev)
			shift_is_pressed = false
			key_W_is_pressed = false
			id++
		}

		if (shift_is_pressed && key_X_is_pressed && currentMesh) {
			if (world.instances.length > 1) {
				currentMesh.dispose(false)
				world.instances	 = world.instances.filter(
					instance => instance.name !== currentMesh?.name
				)
			}
		}
})

world.originals.forEach(({mesh}) => {
	mesh.isVisible = false
})


resize(100)
start()


console.log("🎨")

