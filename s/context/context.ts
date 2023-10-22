
import {Context, prepare_frontend} from "@benev/slate"
import {generateId} from "@benev/toolbox/x/utils/generate-id.js"

import {theme} from "./theme.js"
import {AppState} from "./app_state.js"
import {actions} from "./app_actions.js"
import {Historian} from "./framework/historian.js"
import {Action} from "./framework/action_namespace.js"
import {Babylon} from "./controllers/babylon/babylon.js"
import {Catalog} from "./controllers/catalog/catalog.js"

export class AppContext extends Context {
	theme = theme

	#app = this.watch.stateTree<AppState>({
		outline: {
			name: "root",
			kind: "folder",
			id: generateId(),
			selected: false,
			children: [],
		},
	})

	#action_specs = actions

	#historian = new Historian(
		this.watch,
		this.#app,
		this.#action_specs,
	)

	actions = Action.callers(
		this.#app,
		this.#historian,
		this.#action_specs,
	)

	get state() {
		return this.#app.state
	}

	history = this.#historian.history
	babylon = new Babylon()
	catalog = new Catalog(this.tower, this.babylon.scene)
}

export const context = new AppContext()

export const {carbon, oxygen, obsidian, quartz} = (
	prepare_frontend(context)
)

