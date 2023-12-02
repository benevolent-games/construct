
import {World} from "./controllers/world/controller.js"
import {Edcore} from "./controllers/edcore/controller.js"
import {EditorOutline} from "./controllers/outline/editor.js"
import {Flowchart} from "./controllers/flowchart/controller.js"
import {MiniContext, MiniContextOptions} from "./mini_context.js"
import {file_is_glb} from "../tools/shockdrop/utils/file_is_glb.js"
import {establish_hotkeys} from "./controllers/hotkeys/controller.js"
import {OutlineGenius} from "./controllers/outline_genius/controller.js"
import {DropCoordinator} from "./controllers/drop_coordinator/controller.js"
import {StateTree, watch} from "@benev/slate"
import {State as BaseState, default_state} from "./state.js"
import {BaseActionsBlueprint, actions_blueprint} from "./actions_blueprint.js"


export interface ContextOptions<
		State extends BaseState,
		Actions extends BaseActionsBlueprint
	> extends MiniContextOptions {

	initial_state: State
}

export class Context<
		State extends BaseState,
		Actions extends BaseActionsBlueprint
	> extends MiniContext {

	#tree: StateTree<State>
	#actions: Actions<State>
	#historian: Historian<State, Actions>

	constructor(options: ContextOptions<State, Actions>) {
		super(options)

		this.#tree = watch.stateTree<State>(options.initial_state)

		// const world = new World(
		// 	this.edcore,
		// 	this.outline,
		// )

		// flowchart = new Flowchart({
		// 	edcore: this.edcore,
		// 	world: this.world,
		// 	gesture: this.gesture,
		// 	outline: this.outline,
		// })

		// drops = new DropCoordinator(
		// 	this.edcore.actions,
		// 	this.world.warehouse,
		// )

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

