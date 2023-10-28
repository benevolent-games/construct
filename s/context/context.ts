
import {Context as BaseContext, pub} from "@benev/slate"

import type {panels as all_panels} from "../panels/panels.js"

import {theme} from "./theme.js"
import {actions} from "./actions.js"
import {State, default_state} from "./state.js"
import {Tactic} from "../tools/tactic/sketch.js"
import {Historian} from "./framework/historian.js"
import {Action} from "./framework/action_namespace.js"
import {Babylon} from "./controllers/babylon/babylon.js"
import {Store, store} from "./controllers/store/store.js"
import {Warehouse} from "./controllers/warehouse/warehouse.js"
import {LayoutController} from "./controllers/layout/controller.js"
import {Instantiator} from "./controllers/instantiator/instantiator.js"

export class Context extends BaseContext {
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
		this.signals,
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
		signals: this.signals,
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

	store = store<Store>(localStorage)
	layout = new LayoutController(this.watch, this.store)

	constructor(public panels: typeof all_panels) {
		super()
	}
}

