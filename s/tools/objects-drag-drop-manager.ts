import {Folder} from "./folder.js"
import {ObjectSource, Publish, Object} from "../components/types.js"

export class ObjectsDragDropManager {
	#object_source: ObjectSource | undefined

	drag_object_start(object: Object, folder: Folder) {
		this.#object_source = {
			object,
			folder
		}
	}

	drag_object_drop(folder: Folder, publish: Publish) {
		if (this.#object_source && !this.have_error(folder)) {
			folder.add_object(this.#object_source.object)
			this.#object_source?.folder.delete_object_from_outliner(this.#object_source.object)
			publish()
		}
	}

	drag_object_end() {
		this.#object_source = undefined
	}

	have_error(folder: Folder) {
		return this.is_object_dropped_to_same_folder(folder)
	}

	is_object_dropped_to_same_folder(folder: Folder) {
		return this.#object_source?.folder === folder
	}
}
