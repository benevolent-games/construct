
import {ZipAction} from "@benev/slate"

import {State} from "./state.js"
import {slots} from "./domains/slots/actions.js"
import {outline} from "./domains/outline/actions.js"
import {outline_actions} from "./domains/outline2/actions.js"

// export type EditorActions = ZipAction.Callable<typeof actions_blueprint>

export type BaseActionsBlueprint = ReturnType<typeof actions_blueprint>

export const actions_blueprint = () => ZipAction.blueprint<State>()({
	slots,
	outline,
	outline2: outline_actions,
})

