
import {Pojo, Context as SlateContext, pub} from "@benev/slate"

import {theme} from "./theme.js"
import {store} from "./controllers/store/store.js"
import {PanelSpec} from "../panels/panel_parts.js"
import {Gesture} from "./controllers/gesture/controller.js"
import {LayoutController} from "./controllers/layout/controller.js"

export class MiniContext extends SlateContext {
	theme = theme

	/** editor app persistence */
	store = store(localStorage)

	/** layout state, actions, and helpers */
	layout = new LayoutController(
		this.watch,
		this.store,
	)

	/** user input, pointer lock, and focalization */
	gesture = new Gesture(
		this.signals,
		this.flat,
	)

	/** drop events */
	drops = {

		/** listen to this to react to file drops onto the editor */
		on_file_drop: pub<File[]>(),

		/** publish this to tell the editor not to react to a file drop */
		on_file_drop_already_handled_internally: pub<void>(),
	}

	constructor(public panels: Pojo<PanelSpec>) {
		super()
	}
}

