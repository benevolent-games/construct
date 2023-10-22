
import {Context, prepare_frontend} from "@benev/slate"
import {generateId} from "@benev/toolbox/x/utils/generate-id.js"

import {theme} from "./theme.js"
import {Basis} from "./basis/basis.js"
import {AppState} from "./basis/app_state.js"
import {Babylon} from "./controllers/babylon/babylon.js"
import {Catalog} from "./controllers/catalog/catalog.js"
import {outline_actions} from "./basis/domains/outline/actions.js"

const deferred = undefined as any

export class AppContext extends Context {
	theme = theme

	app = this.watch.stateTree<AppState>({
		outline: {
			name: "root",
			kind: "folder",
			id: generateId(),
			selected: false,
			children: [],
		},
	})

	basis = new Basis(this.watch, this.app, {
		...outline_actions(),
	})

	babylon: Babylon = deferred
	catalog: Catalog = deferred

	setup() {
		this.babylon = new Babylon()
		this.catalog = new Catalog(this.babylon.scene)
	}
}

export const context = new AppContext()

export const {carbon, oxygen, obsidian, quartz} = (
	prepare_frontend(context)
)

