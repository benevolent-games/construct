
import "@babylonjs/core/Culling/ray.js"
import "@babylonjs/core/Rendering/edgesRenderer.js"

import {Scene} from "@babylonjs/core/scene.js"
import {Mesh} from "@babylonjs/core/Meshes/mesh.js"
import {Vector3} from "@babylonjs/core/Maths/math.js"
import {NubDetail, NubEffectEvent} from "@benev/nubs"
import {spawn_light} from "@benev/toolbox/x/demo/spawn_light.js"
import {AbstractMesh} from "@babylonjs/core/Meshes/abstractMesh.js"
import {InstancedMesh} from "@babylonjs/core/Meshes/instancedMesh.js"
import {TransformNode} from "@babylonjs/core/Meshes/transformNode.js"
import {BenevTheater} from "@benev/toolbox/x/babylon/theater/element.js"
import {invert_y_axis} from "@benev/toolbox/x/babylon/flycam/utils/inversions.js"
import {make_fly_camera} from "@benev/toolbox/x/babylon/flycam/make_fly_camera.js"
import {integrate_nubs_to_control_fly_camera} from "@benev/toolbox/x/babylon/flycam/integrate_nubs_to_control_fly_camera.js"

import {Graph} from "../graph/graph.js"
import {make_box} from "./parts/make-box.js"
import {Id, Unit} from "../graph/parts/types.js"
import {editor_schema} from "./parts/editor-schema.js"

function get_actual_meshes(node: TransformNode | Mesh | InstancedMesh) {
	return node instanceof AbstractMesh
		? [node, ...node.getChildMeshes()]
		: node.getChildMeshes()
}

export class World {
	#scene: Scene
	#graph: Graph
	#move_enabled = false
	#theater: BenevTheater
	#keys_pressed = new Set<string>()
	#instances = new Map<Id, TransformNode | Mesh>()
	#ids = new Map<AbstractMesh, Id>()
	#is_pointer_locked = () => this.#theater["pointer-lock"]

	constructor(
			graph: Graph,
			theater: BenevTheater,
		) {

		this.#graph = graph
		this.#theater = theater
		this.#scene = theater.babylon.scene

		graph.on.added(this.#add)
		graph.on.removed(this.#remove)
		graph.on.selected(this.#select)
		graph.on.deselected(this.#deselect)

		NubEffectEvent.target(window)
			.listen(this.#manage_effect_events)
	}

	#add = ([id, item]: [Id, Unit]) => {
		const position = item.node.position.clone()
		const instance = item.node.instantiateHierarchy()! as TransformNode | Mesh
		instance.id = id
		this.#instances.set(id, instance)
		instance.position = position
		for (const mesh of get_actual_meshes(instance))
			this.#ids.set(mesh, id)
	}

	#remove = (id: Id) => {
		const instance = this.#instances.get(id)!
		instance.dispose()
		this.#instances.delete(id)
		for (const mesh of get_actual_meshes(instance))
			this.#ids.delete(mesh)
	}

	#select = (id: Id) => {
		const instance = this.#instances.get(id)!
		for (const mesh of get_actual_meshes(instance)) {
			mesh.enableEdgesRendering()
			mesh.edgesWidth = 8
		}
	}

	#deselect = (id: Id) => {
		const instance = this.#instances.get(id)!
		for (const mesh of get_actual_meshes(instance)) {
			mesh.disableEdgesRendering()
		}
	}

	#manage_effect_events = ({detail}: NubEffectEvent) => {
		if ((detail as NubDetail.Key).pressed)
			this.#keys_pressed.add(detail.cause)
		else
			this.#keys_pressed.delete(detail.cause)

		switch (detail.effect) {
			case "select": {
				const pressed = (detail as NubDetail.Key).pressed
				if (pressed) {
					const pick = this.#scene.pick(
						this.#scene.pointerX,
						this.#scene.pointerY,
					)
					if (pick?.hit) {
						const mesh = pick.pickedMesh as unknown as AbstractMesh
						const id = this.#ids.get(mesh)
						if (id) {
							if (this.#graph.selected(id))
								this.#graph.deselect(id)
							else
								this.#graph.select(id)
						}
					}
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

			case "pointer_lock": {
				if(!this.#is_pointer_locked()) {
					this.#theater.requestPointerLock()
				}
				break
			}

			case "move": {
				if ((detail as NubDetail.Key).pressed) {
					this.#move_enabled = !this.#move_enabled
				}
				break
			}
		}
	}

	start_world() {
		const {
			nubContext,
			babylon: {
				renderLoop
			}
		} = this.#theater

		nubContext!.modes_set.assign(["selection", "transform", "fly"])
		nubContext!.schema = editor_schema

		const fly = make_fly_camera({
			scene: this.#scene,
			position: [0, 0, 0]
		})
		integrate_nubs_to_control_fly_camera({
			fly,
			nub_context: nubContext!,
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
				base: 0.1,
				fast: 0.2,
				slow: 0.01,
			},
		})

		spawn_light(this.#scene, [0.11, 0.88, 0.44])

		const box = make_box(this.#scene)
		const box_parent = new TransformNode("box", this.#scene)
		box.parent = box_parent
		box.setEnabled(false)

		this.#graph.add({name: "box", node: box_parent})
	}
}

