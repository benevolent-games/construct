
import {Scene} from "@babylonjs/core/scene.js"
import {TransformNode} from "@babylonjs/core/Meshes/transformNode.js"

import {Graph} from "../graph/graph.js"
import {Id, Unit} from "../graph/parts/types.js"

export class World {
	#scene: Scene
	#instances = new Map<Id, TransformNode>()

	constructor(
			scene: Scene,
			graph: Graph,
		) {
		this.#scene = scene
		graph.on.item_added(this.#add)
		graph.on.item_removed(this.#remove)
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
}

