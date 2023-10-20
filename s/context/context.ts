
import {Context, prepare_frontend} from "@benev/slate"

import {theme} from "./theme.js"
import {Graph} from "./controllers/graph/graph.js"
import {Babylon} from "./controllers/babylon/babylon.js"
import {Catalog} from "./controllers/catalog/catalog.js"

const deferred = undefined as any

export class AppContext extends Context {
	theme = theme

	babylon: Babylon = deferred
	graph: Graph = deferred
	catalog: Catalog = deferred

	setup() {
		const babylon = new Babylon()
		const graph = new Graph()
		const catalog = new Catalog(graph, babylon.scene)

		this.babylon = babylon
		this.graph = graph
		this.catalog = catalog
	}
}

export const context = new AppContext()

export const {carbon, oxygen, obsidian, quartz} = (
	prepare_frontend(context)
)

