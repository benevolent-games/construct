
import {Context, prepare_frontend} from "@benev/slate"

import {theme} from "./theme.js"
import {Graph} from "./controllers/graph/graph.js"
import {Babylon} from "./controllers/babylon/babylon.js"
import {Catalog} from "./controllers/catalog/catalog.js"
import {Outliner} from "./controllers/outliner/outliner.js"

const deferred = undefined as any

export class AppContext extends Context {
	theme = theme

	babylon: Babylon = deferred
	graph: Graph = deferred
	catalog: Catalog = deferred
	outliner: Outliner = deferred

	setup() {
		this.babylon = new Babylon()
		this.graph = new Graph()
		this.catalog = new Catalog(this.babylon.scene)
		this.outliner = new Outliner(this.graph)
	}
}

export const context = new AppContext()

export const {carbon, oxygen, obsidian, quartz} = (
	prepare_frontend(context)
)

