
import {Pojo, Context as SlateContext} from "@benev/slate"

import {theme} from "./theme.js"
import {store} from "./controllers/store/store.js"
import {PanelSpec} from "../panels/panel_parts.js"
import {Gesture} from "./controllers/gesture/controller.js"
import {LayoutController} from "./controllers/layout/controller.js"
import {StockLayouts} from "./controllers/layout/parts/utils/stock_layouts.js"
import {MiniDropCoordinator} from "./controllers/drop_coordinator/mini_controller.js"

export interface MiniContextOptions {
	panels: Pojo<PanelSpec>,
	layouts: StockLayouts,
}

export class MiniContext extends SlateContext {
	theme = theme

	/** editor app persistence */
	store = store(localStorage)

	/** panels available to the user */
	panels: Pojo<PanelSpec>

	/** layout state, actions, and helpers */
	layout: LayoutController

	/** user input, pointer lock, and focalization */
	gesture = new Gesture()

	/** drop events */
	drops = new MiniDropCoordinator()

	constructor({panels, layouts}: MiniContextOptions) {

		super()

		this.panels = panels

		this.layout = new LayoutController(
			this.store,
			layouts,
		)
	}
}

