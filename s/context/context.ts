
import {watch} from "@benev/slate"

import {World} from "./controllers/world/controller.js"
import {Edcore} from "./controllers/edcore/controller.js"
import {editorData} from "./domains/outline2/editor_data.js"
import {OutlineModel} from "./domains/outline2/model/model.js"
import {Flowchart} from "./controllers/flowchart/controller.js"
import {MiniContext, MiniContextOptions} from "./mini_context.js"
import {file_is_glb} from "../tools/shockdrop/utils/file_is_glb.js"
import {establish_hotkeys} from "./controllers/hotkeys/controller.js"
import {OutlineGenius} from "./controllers/outline_genius/controller.js"
import {DropCoordinator} from "./controllers/drop_coordinator/controller.js"

export interface ContextOptions extends MiniContextOptions {}

export class Context extends MiniContext {

	/** editor state tree with history */
	edcore = new Edcore()

	/** helper for asking questions about the outline */
	outline = new OutlineGenius(
		() => this.edcore.state.outline
	)

	/** helper for asking questions about the outline */
	outline2 = new OutlineModel(
		watch.computed(() => this.edcore.state.outline2)
	)

	/** extensible editor concepts configuration */
	editorData = editorData

	/** the 3d babylon world and glbs */
	world = new World(
		this.edcore,
		this.outline,
	)

	/** manage mutually-exclusive editor modes */
	flowchart = new Flowchart({
		edcore: this.edcore,
		world: this.world,
		gesture: this.gesture,
		outline: this.outline,
	})

	/** manages all drag-and-drop operations */
	drops = new DropCoordinator(
		this.edcore.actions,
		this.world.warehouse,
	)

	constructor(options: ContextOptions) {
		super(options)

		// assign commands to various hotkeys
		establish_hotkeys(
			this.edcore,
			this.outline,
			this.gesture,
		)

		// handle GLB file drops
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

