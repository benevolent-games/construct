
import {Context, prepare_frontend} from "@benev/slate"

import {theme} from "./theme.js"
import {Scene} from "@babylonjs/core/scene.js"
import {Graph} from "./controllers/graph/graph.js"
import {Catalog} from "./controllers/catalog/catalog.js"

const deferred = undefined as any

export class AppContext extends Context {
	theme = theme

	graph: Graph = deferred
	catalog: Catalog = deferred
	// world: World = deferred
	// outliner: Outliner = deferred

	setup(scene: Scene) {
		this.graph = new Graph()
		this.catalog = new Catalog(this.graph, scene)
		this.graph = new Graph()
		// this.world = new World(this.graph, theater)
		// this.outliner = new Outliner(this.flat, this.graph)
	}
}

export const context = new AppContext()

export const {carbon, oxygen, obsidian, quartz} = (
	prepare_frontend(context)
)

