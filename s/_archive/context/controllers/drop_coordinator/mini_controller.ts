
import {pub} from "@benev/slate"
import {ShockDrop} from "../../../tools/shockdrop/drop.js"
import {dropped_files} from "../../../tools/shockdrop/utils/dropped_files.js"
import {drag_has_files} from "../../../tools/shockdrop/utils/drag_has_files.js"

export class MiniDropCoordinator {

	/** listen to this to react to file drops onto the editor */
	on_file_drop = pub<File[]>()

	/** dropzone handling for the editor at large */
	editor = new ShockDrop({
		predicate: drag_has_files,
		handle_drop: event => {
			this.on_file_drop.publish(dropped_files(event))
		},
	})
}

