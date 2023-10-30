
import {State} from "./state.js"
import {slots} from "./domains/slots/actions.js"
import {items} from "./domains/outline/actions.js"
import {Action} from "./framework/action_namespace.js"

export type Actions = Action.Callers<typeof actions>

export const actions = Action.specs<State>()(() => ({
	slots,
	items,
}))

