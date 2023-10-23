
import {Context, prepare_frontend} from "@benev/slate"

import {theme} from "./theme.js"
import {actions} from "./actions.js"
import {State, default_state} from "./state.js"
import {Historian} from "./framework/historian.js"
import {Action} from "./framework/action_namespace.js"
import {Babylon} from "./controllers/babylon/babylon.js"
import {Catalog} from "./controllers/catalog/catalog.js"
import { Tactic } from "../tools/tactic/sketch.js"

export class AppContext extends Context {
	theme = theme

	#action_specs = actions
	#app = this.watch.stateTree<State>(default_state())
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

	renderLoop = new Set<() => void>()
	history = this.#historian.history
	babylon = new Babylon(this.renderLoop)
	catalog = new Catalog(this.tower, this.babylon.scene)

	tactic = new Tactic({
		tower: this.tower,
		bindings: {
			buttons: {
				select: "LMB",
				forward: "KeyW",
				backward: "KeyS",
				leftward: "KeyA",
				rightward: "KeyD",
			},
			vectors: {
				look: "mouse",
			},
		},
		devices: [new Tactic.Keyboard(window)],
	})
}

export const context = new AppContext()

export const {carbon, oxygen, obsidian, quartz} = (
	prepare_frontend(context)
)

