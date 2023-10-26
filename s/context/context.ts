
import {Context, prepare_frontend, pub} from "@benev/slate"

import {theme} from "./theme.js"
import {actions} from "./actions.js"
import {State, default_state} from "./state.js"
import {Tactic} from "../tools/tactic/sketch.js"
import {Historian} from "./framework/historian.js"
import {Action} from "./framework/action_namespace.js"
import {Babylon} from "./controllers/babylon/babylon.js"
import {LayoutMachine} from "./controllers/layout/layout.js"
import {Warehouse} from "./controllers/warehouse/warehouse.js"
import {Instantiator} from "./controllers/instantiator/instantiator.js"

export class AppContext extends Context {
	theme = theme

	#app = this.watch.stateTree<State>(default_state())

	get state() {
		return this.#app.state
	}

	#action_specs = actions

	#historian = new Historian(
		this.watch,
		this.#app,
		this.#action_specs,
	)

	history = this.#historian.history

	actions = Action.callers(
		this.#app,
		this.#historian,
		this.#action_specs,
	)

	renderLoop = new Set<() => void>()

	babylon = new Babylon(this.renderLoop)

	warehouse = new Warehouse(
		this.tower,
		this.watch,
		this.#app,
		this.babylon.scene,
		this.actions,
	)

	instantiator = new Instantiator(
		this.watch,
		this.#app,
		this.warehouse,
	)

	on_file_drop_already_handled_internally = pub<void>()

	tactic = new Tactic({
		tower: this.tower,
		devices: [new Tactic.Keyboard(window)],
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
	})

	layout = new LayoutMachine()
}

export const context = new AppContext()

export const {carbon, oxygen, obsidian, quartz} = (
	prepare_frontend(context)
)

