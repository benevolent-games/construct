
import {Flat} from "@benev/frog"
import {Scene} from "@babylonjs/core/scene.js"
import {Graph} from "./aspects/graph/graph.js"
import {World} from "./aspects/world/world.js"
import {Catalog} from "./aspects/catalog/catalog.js"

export class Context {
	readonly catalog: Catalog
	readonly graph: Graph
	readonly world: World

	constructor(
			public flat: Flat,
			public scene: Scene,
		) {

		this.catalog = new Catalog(this.flat, scene)
		this.graph = new Graph()
		this.world = new World(scene, this.graph)
	}
}

