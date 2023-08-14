
import {Flat} from "@benev/frog"
import {Scene} from "@babylonjs/core/scene.js"

import {Graph} from "./controllers/graph/graph.js"
import {World} from "./controllers/world/world.js"
import {Catalog} from "./controllers/catalog/catalog.js"
import {Outliner} from "./controllers/outliner/outliner.js"

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

