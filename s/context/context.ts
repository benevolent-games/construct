
import type {panels as all_panels} from "../panels/panels.js"

import {MiniContext, MiniContextOptions} from "./mini_context.js"
import {Tree} from "./controllers/tree/controller.js"
import {World} from "./controllers/world/controller.js"
import {Mover} from "./controllers/mover/controller.js"
import {file_is_glb} from "../tools/shockdrop/utils/file_is_glb.js"

export interface ContextOptions extends MiniContextOptions {}

export class Context extends MiniContext {

	/** editor state tree */
	tree = new Tree(
		this.watch,
	)

	/** the 3d babylon world and glbs */
	world = new World(
		this.signals,
		this.watch,
		this.tree,
	)

	/** system for grabbing, rotating, scaling things */
	mover = new Mover(
		this.signals,
		this.tree,
		this.world,
		this.gesture,
	)

	constructor(options: ContextOptions) {
		super(options)

		this.drops.on_file_drop(files => {
			for (const file of files) {
				if (file_is_glb(file))
					this.world.warehouse.add_glb_file(file)
				else
					console.warn("unrecognized filetype", file.name)
			}
		})
	}
}

