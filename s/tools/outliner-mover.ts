import {Folder} from "./folder.js"
import {Publish, Source} from "../components/types.js"

export class OutlinerMover {
	#source: Source | undefined
	

	drag_folder_start(parent_folder: Folder, child_folder: Folder) {
		this.#source = {
			parent_folder,
			child_folder
		}
	}

	drag_folder_drop(folder: Folder, publish: Publish) {
		if (this.#source && !this.is_dropped_to_same_folder(folder)) {
			folder.add_folder(this.#source.child_folder)
			this.#source.parent_folder
				.delete_folder(this.#source.child_folder)
			publish()
		}
	}

	drag_folder_end() {
		this.#source = undefined
	}

	is_dropped_to_same_folder(folder: Folder) {
		if (
			this.#source?.parent_folder.folders
				=== folder.folders
			|| folder === this.#source?.child_folder
		)
			return true
	}
}
