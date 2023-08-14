
import {Flat} from "@benev/frog"
import {Scene} from "@babylonjs/core/scene.js"
import {Graph} from "./aspects/graph/graph.js"
import {World} from "./aspects/world/world.js"
import {Catalog} from "./aspects/catalog/catalog.js"
import {Outliner} from "./aspects/outliner/outliner.js"

export class Context {
	readonly catalog: Catalog
	readonly graph: Graph
	readonly world: World
	readonly outliner: Outliner

	constructor(
			public flat: Flat,
			public scene: Scene,
		) {

		this.catalog = new Catalog(this.flat, scene)
		this.graph = new Graph()
		this.world = new World(scene, this.graph)
		this.outliner = new Outliner(this.flat, this.graph)
	}
}

