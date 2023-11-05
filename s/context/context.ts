
import type {panels as all_panels} from "../panels/panels.js"

import {MiniContext} from "./mini_context.js"
import {Tree} from "./controllers/tree/controller.js"
import {Mover} from "./controllers/mover/controller.js"
import {World} from "./controllers/world/controller.js"
import {Babylon} from "./controllers/babylon/babylon.js"
import {Warehouse} from "./controllers/warehouse/warehouse.js"
import {file_is_glb} from "../tools/shockdrop/utils/file_is_glb.js"

export class Context extends MiniContext {

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

	/** system for grabbing, rotating, scaling things */
	mover = new Mover(
		this.signals,
		this.tree,
		this.world,
		this.gesture,
	)

	constructor(public panels: typeof all_panels) {
		super(panels)
		this.drops.on_file_drop(files => {
			for (const file of files) {
				if (file_is_glb(file))
					this.warehouse.add_glb_file(file)
				else
					console.warn("unrecognized filetype", file.name)
			}
		})
	}
}

