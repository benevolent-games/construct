
import {Flat} from "@benev/frog"
import {BenevTheater} from "@benev/toolbox/x/babylon/theater/element.js"

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
			public theater: BenevTheater,
		) {

		this.graph = new Graph()
		this.world = new World(this.graph, theater)
		this.outliner = new Outliner(this.flat, this.graph)
		this.catalog = new Catalog(this.flat, this.graph, theater.babylon.scene)
	}
}

