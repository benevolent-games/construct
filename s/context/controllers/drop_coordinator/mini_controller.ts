
import {pub} from "@benev/slate"

export class MiniDropCoordinator {

	/** listen to this to react to file drops onto the editor */
	on_file_drop = pub<File[]>()

	/** publish this to tell the editor not to react to a file drop */
	on_file_drop_already_handled_internally = pub<void>()
}

