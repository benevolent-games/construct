
import {StateTree, watch} from "@benev/slate"

import {actions} from "../../actions.js"
import {State, default_state} from "../../state.js"
import {Historian} from "../../framework/historian.js"
import {Action} from "../../framework/action_namespace.js"

export class Tree {
	#app: StateTree<State>
	#historian: Historian<State>

	actions: Action.Callers<typeof actions>
	get state() { return this.#app.state }
	get history() { return this.#historian.history }

	constructor() {
		this.#app = watch.stateTree(default_state())
		this.#historian = new Historian(
			this.#app,
			actions,
		)
		this.actions = Action.callers(
			this.#app,
			this.#historian,
			actions,
		)
	}
}

