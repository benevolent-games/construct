
import {State} from "../state.js"
import {ZipAction} from "@benev/slate"
import {OutlineGenius} from "../controllers/outline_genius/controller.js"

export const actionate = {

	outline: ZipAction.prep(
		(state: State) => new OutlineGenius(state.outline)
	),

	slots: ZipAction.prep(
		(state: State) => state.slots
	),
}

