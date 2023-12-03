
import {Context, Pojo} from "@benev/slate"

import {theme} from "./theme.js"
import {PanelSpec} from "./types/panel.js"
import {store} from "./models/store/store.js"
import {Gesture} from "./models/gesture/gesture.js"
import {FabricDrops} from "./models/drops/drops.js"
import {LayoutController} from "./models/layout/layout.js"
import {StockLayouts} from "./models/layout/parts/utils/stock_layouts.js"

export interface FabricOptions {
	panels: Pojo<PanelSpec>
	layouts: StockLayouts
}

export class FabricContext extends Context {

	/** css theme applied to all components and views */
	theme = theme

	/** persistence */
	store = store(localStorage)

	/** handle file drops */
	drops = new FabricDrops()

	/** user input, pointer lock, and focalization */
	gesture: Gesture<any> = new Gesture({binds: {}})

	/** panels available to the user */
	panels: Pojo<PanelSpec>

	/** layout state, actions, and helpers */
	layout: LayoutController

	constructor({panels, layouts}: FabricOptions) {
		super()

		this.panels = panels

		this.layout = new LayoutController(
			this.store,
			layouts,
		)
	}
}

