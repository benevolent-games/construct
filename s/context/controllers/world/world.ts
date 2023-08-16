
import "@babylonjs/core/Culling/ray.js"
import "@babylonjs/core/Rendering/edgesRenderer.js"

import {Scene} from "@babylonjs/core/scene.js"
import {Vector3} from "@babylonjs/core/Maths/math.js"
import {spawn_light} from "@benev/toolbox/x/demo/spawn_light.js"
import {NubContext, NubDetail, NubEffectEvent} from "@benev/nubs"
import {InstancedMesh} from "@babylonjs/core/Meshes/instancedMesh.js"
import {TransformNode} from "@babylonjs/core/Meshes/transformNode.js"
import {invert_y_axis} from "@benev/toolbox/x/babylon/flycam/utils/inversions.js"
import {make_fly_camera} from "@benev/toolbox/x/babylon/flycam/make_fly_camera.js"
import {integrate_nubs_to_control_fly_camera} from "@benev/toolbox/x/babylon/flycam/integrate_nubs_to_control_fly_camera.js"

import {Graph} from "../graph/graph.js"
import {make_box} from "./parts/make-box.js"
import {Id, Unit} from "../graph/parts/types.js"

export class World {
	#scene: Scene
	#graph: Graph
	#move_enabled = false
	#keys_pressed = new Set<string>()
	#instances = new Map<Id, TransformNode>()

	constructor(
			scene: Scene,
			graph: Graph,
		) {
		this.#graph = graph
		this.#scene = scene
		graph.on.added(this.#add)
		graph.on.removed(this.#remove)
		graph.on.selected(this.#select)
		graph.on.deselected(this.#deselect)

		NubEffectEvent.target(window)
			.listen(this.#manage_effect_events)
	}

	#add = ([id, item]: [Id, Unit]) => {
		const pos = item.node.position
		const instance = item.node.instantiateHierarchy()!
		instance.id = id
		this.#instances.set(id, instance)
		this.#scene.addTransformNode(instance)

		instance.position = new Vector3(pos.x, pos.y + 3, pos.z)
	}

	#remove = (id: Id) => {
		const instance = this.#instances.get(id)!
		instance.dispose()
		this.#instances.delete(id)
	}

	#select = (id: Id) => {
		const instance = this.#instances.get(id)!
		const mesh = instance.getChildMeshes(true)[0]
		mesh.enableEdgesRendering()
		mesh.edgesWidth = 8
	}

	#deselect = (id: Id) => {
		const instance = this.#instances.get(id)!
		const mesh = instance.getChildMeshes(true)[0]
		mesh.disableEdgesRendering()
	}

	#manage_effect_events = ({detail}: NubEffectEvent) => {
		if ((detail as NubDetail.Key).pressed) {
			this.#keys_pressed.add(detail.cause)
		}
		else {
			this.#keys_pressed.delete(detail.cause)
		}

		switch (detail.effect) {
			case "select": {
				const pressed = (detail as NubDetail.Key).pressed
				if (pressed) {
					const pick = this.#scene.pick(
						this.#scene.pointerX, this.#scene.pointerY
					)
					if (pick?.hit) {
						const pickedMesh = pick.pickedMesh as unknown as InstancedMesh
						const id = pickedMesh.parent!.id
						if (this.#graph.selected(id)) {
							this.#graph.deselect(id)
						} else {
							this.#graph.select(id)
						}
						this.#move_enabled = true
					}
				}
				else {
					this.#move_enabled = false
				}
				break
			}

			case "duplicate": {
				const shift_is_pressed = this.#keys_pressed.has("ShiftLeft")
				const key_W_is_pressed = this.#keys_pressed.has("KeyW")
				if(shift_is_pressed && key_W_is_pressed) {
					for (const id of this.#graph.selection) {
						const instance = this.#instances.get(id)!
						this.#graph.add({
							name: `instance${id}`,
							node: instance
						})
					}
				}
				break
			}

			case "look": {
				const selected_meshes = [...this.#graph.selection]
				const has_selected_meshes = selected_meshes.length > 0
				if (this.#move_enabled && detail.cause === "Pointer" && has_selected_meshes) {
					const [x, y] = invert_y_axis(
						(detail as NubDetail.Pointer).movement
					)
					const new_position = new Vector3(x / 10, y / 10, 0)
					for (const id of selected_meshes) {
						const instance = this.#instances.get(id)!
						instance.position.addInPlace(new_position)
					}
				}
				break
			}
		}
	}

	start_world({
		renderLoop, nubContext
	}: {
		nubContext: NubContext
		renderLoop: Set<() => void>
	}) {

		const fly = make_fly_camera({
			scene: this.#scene,
			position: [0, 0, 0]
		})
		integrate_nubs_to_control_fly_camera({
			fly,
			nub_context: nubContext,
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

		spawn_light(this.#scene, [0.11, 0.88, 0.44])

		const box = make_box(this.#scene)
		const box_parent = new TransformNode("box", this.#scene)
		box.parent = box_parent
		box.isVisible = false

		this.#graph.add({name: "box", node: box_parent})
	}
}

