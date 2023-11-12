
import {State, default_state} from "../../state.js"
import {AppCore} from "../../framework/app_core.js"
import {actions_blueprint} from "../../actions_blueprint.js"

export class Edcore extends AppCore<State, typeof actions_blueprint> {
	constructor() {
		super({
			initial_state: default_state(),
			actions_blueprint,
			history_limit: 256,
		})
	}
}

