
import {State} from "./state.js"
import {ZipAction} from "@benev/slate"
import {slots} from "./domains/slots/actions.js"
import {outline} from "./domains/outline/actions.js"

export const actions_blueprint = ZipAction.blueprint<State>()({
	slots,
	outline,
})

