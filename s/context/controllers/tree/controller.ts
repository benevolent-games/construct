
import {StateTree, ZipAction, watch} from "@benev/slate"

import {State, default_state} from "../../state.js"
import {Historian} from "../../framework/historian.js"
import {actionsBlueprint} from "../../actions_blueprint.js"
import {HistoryAction} from "../../framework/history_action.js"

export class Tree {
	#app: StateTree<State>
	#historian: Historian<State>

	actions: ZipAction.Callable<typeof actionsBlueprint>
	get state() { return this.#app.state }
	get history() { return this.#historian.history }

	constructor() {
		this.#app = watch.stateTree(default_state())
		this.#historian = new Historian(
			this.#app,
			actionsBlueprint,
		)
		this.actions = HistoryAction.actualize(
			this.#app,
			this.#historian,
			actionsBlueprint,
		)
	}
}

