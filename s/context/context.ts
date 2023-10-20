
import {Context, prepare_frontend} from "@benev/slate"

import {theme} from "./theme.js"
import {Babylon} from "./controllers/babylon/babylon.js"
import {Catalog} from "./controllers/catalog/catalog.js"
import {Graphliner} from "./controllers/graphliner/graphliner.js"

const deferred = undefined as any

export class AppContext extends Context {
	theme = theme

	babylon: Babylon = deferred
	graphliner: Graphliner = deferred
	catalog: Catalog = deferred

	setup() {
		this.babylon = new Babylon()
		this.graphliner = new Graphliner()
		this.catalog = new Catalog(this.babylon.scene)
	}
}

export const context = new AppContext()

export const {carbon, oxygen, obsidian, quartz} = (
	prepare_frontend(context)
)

