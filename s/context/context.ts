
import {Tree} from "./controllers/tree/controller.js"
import {World} from "./controllers/world/controller.js"
import {Flowchart} from "./controllers/flowchart/controller.js"
import {MiniContext, MiniContextOptions} from "./mini_context.js"
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

	/** manage mutually-exclusive editor modes */
	flowchart = new Flowchart({
		tree: this.tree,
		world: this.world,
		gesture: this.gesture,
		signals: this.signals,
	})

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

