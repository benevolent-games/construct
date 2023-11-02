
import {Context as BaseContext, pub} from "@benev/slate"

import type {panels as all_panels} from "../panels/panels.js"

import {theme} from "./theme.js"
import {store} from "./controllers/store/store.js"
import {Tree} from "./controllers/tree/controller.js"
import {World} from "./controllers/world/controller.js"
import {Babylon} from "./controllers/babylon/babylon.js"
import {Gesture} from "./controllers/gesture/controller.js"
import {Warehouse} from "./controllers/warehouse/warehouse.js"
import {LayoutController} from "./controllers/layout/controller.js"

export class Context extends BaseContext {
	theme = theme

	/** editor state tree */
	tree = new Tree(
		this.watch,
	)

	/** babylonjs engine setup */
	babylon = new Babylon()

	/** glb files and props */
	warehouse = new Warehouse(
		this.signals,
		this.watch,
		this.tree,
		this.babylon.scene,
		this.tree.actions,
	)

	/** synchronize the babylon scene to the state */
	world = new World(
		this.watch,
		this.tree,
		this.warehouse,
	)

	/** editor app persistence */
	store = store(localStorage)

	/** user input, pointer lock, and focalization */
	gesture = new Gesture(
		this.signals,
		this.flat,
	)

	/** layout state, actions, and helpers */
	layout = new LayoutController(
		this.watch,
		this.store,
	)

	/** for dropzones to communicate to each other */
	on_file_drop_already_handled_internally = pub<void>()

	constructor(public panels: typeof all_panels) {
		super()
	}
}

