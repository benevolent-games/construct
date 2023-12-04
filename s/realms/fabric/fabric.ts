
import {Pojo} from "@benev/slate"

import {PanelSpec} from "./types/panel.js"
import {FabricOptions} from "./context.js"
import {store} from "./models/store/store.js"
import {Gesture} from "./models/gesture/gesture.js"
import {FabricDrops} from "./models/drops/drops.js"
import {LayoutModel} from "./models/layout/layout.js"

export class Fabric {
	store = store(localStorage)
	drops = new FabricDrops()

	gesture: Gesture<{}> = new Gesture({binds: {}})
	panels: Pojo<PanelSpec>
	layout: LayoutModel

	constructor({panels, layouts}: FabricOptions) {
		this.panels = panels

		this.layout = new LayoutModel(
			this.store,
			layouts,
		)
	}
}

