
import {NubContext} from "@benev/nubs"
import {Scene} from "@babylonjs/core/scene.js"
import {spawn_light} from "@benev/toolbox/x/demo/spawn_light.js"
import {TransformNode} from "@babylonjs/core/Meshes/transformNode.js"
import {make_fly_camera} from "@benev/toolbox/x/babylon/flycam/make_fly_camera.js"
import {integrate_nubs_to_control_fly_camera} from "@benev/toolbox/x/babylon/flycam/integrate_nubs_to_control_fly_camera.js"

import {Graph} from "../graph/graph.js"
import {Id, Unit} from "../graph/parts/types.js"
import {make_box} from "../../../tools/make-box.js"

export class World {
	#scene: Scene
	#instances = new Map<Id, TransformNode>()
	#graph: Graph

	constructor(
			scene: Scene,
			graph: Graph,
		) {
		this.#graph = graph
		this.#scene = scene
		graph.on.added(this.#add)
		graph.on.removed(this.#remove)
	}

	#add = ([id, item]: [Id, Unit]) => {
		const instance = item.node.instantiateHierarchy()!
		this.#instances.set(id, instance)
		this.#scene.addTransformNode(instance)
	}

	#remove = (id: Id) => {
		const instance = this.#instances.get(id)!
		instance.dispose()
		this.#instances.delete(id)
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

		this.#graph.add({name: "box", node: box_parent})
	}
}

