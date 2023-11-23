
import {ZipAction} from "@benev/slate"

import {State} from "../state.js"
import {OutlineAdmin} from "./outline2/admin.js"
import {editorDataFacility} from "./outline2/editor_data.js"
import {OutlineGenius} from "../controllers/outline_genius/controller.js"

export const actionate = {

	outline2: ZipAction.prep(
		(state: State) => new OutlineAdmin(state.outline2, editorDataFacility),
	),

	outline: ZipAction.prep(
		(state: State) => new OutlineGenius(state.outline)
	),

	slots: ZipAction.prep(
		(state: State) => state.slots
	),
}

