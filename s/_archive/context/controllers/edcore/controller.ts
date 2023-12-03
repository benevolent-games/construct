
import {AppCore} from "../../framework/app_core.js"
import {BaseState, default_state} from "../../state.js"
import {BaseActionsBlueprint, actions_blueprint} from "../../actions_blueprint.js"

export class Edcore<
		State extends BaseState,
		ActionsBP extends BaseActionsBlueprint,
	> extends AppCore<State, ActionsBP> {

	constructor() {
		super({
			initial_state: default_state(),
			actions_blueprint,
			history_limit: 256,
		})
	}
}

