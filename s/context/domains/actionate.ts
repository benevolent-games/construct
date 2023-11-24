
import {ZipAction} from "@benev/slate"

import {State} from "../state.js"
import {editorData} from "./outline2/editor_data.js"
import {OutlineAdmin} from "./outline2/model/admin.js"
import {OutlineGenius} from "../controllers/outline_genius/controller.js"

export const actionate = {

	outline2: ZipAction.prep(
		(state: State) => new OutlineAdmin(state.outline2, editorData),
	),

	outline: ZipAction.prep(
		(state: State) => new OutlineGenius(state.outline)
	),

	slots: ZipAction.prep(
		(state: State) => state.slots
	),
}

