
import {CSSResultGroup} from "lit"
import {Flat, PrepperContext, requirement} from "@benev/frog"
import {BenevTheater} from "@benev/toolbox/x/babylon/theater/element.js"

import {Graph} from "./controllers/graph/graph.js"
import {World} from "./controllers/world/world.js"
import {Catalog} from "./controllers/catalog/catalog.js"
import {Outliner} from "./controllers/outliner/outliner.js"

export const contextualize = requirement.provide<Context>

export class Context implements PrepperContext {
	readonly catalog: Catalog
	readonly graph: Graph
	readonly world: World
	readonly outliner: Outliner

	constructor(
			public readonly flat: Flat,
			public readonly theme: CSSResultGroup,
			public theater: BenevTheater,
		) {

		this.graph = new Graph()
		this.world = new World(this.graph, theater)
		this.outliner = new Outliner(this.flat, this.graph)
		this.catalog = new Catalog(this.flat, this.graph, theater.babylon.scene)
	}
}

