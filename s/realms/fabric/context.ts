
import {Context, Pojo} from "@benev/slate"

import {theme} from "./theme.js"
import {Fabric} from "./fabric.js"
import {PanelSpec} from "./types/panel.js"
import {StockLayouts} from "./models/layout/parts/utils/stock_layouts.js"

export interface FabricOptions {
	panels: Pojo<PanelSpec>
	layouts: StockLayouts
}

export class FabricContext extends Context {
	theme = theme

	fabric: Fabric

	constructor(options: FabricOptions) {
		super()
		this.fabric = new Fabric(options)
	}
}

