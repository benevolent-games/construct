import {Item} from "./item.js"
import {Folder} from "./folder.js"
import {ObjectSource, Publish} from "../components/types.js"

export class ObjectsDragDropManager {
	#object_source: ObjectSource | undefined

	drag_object_start(item: Item, folder: Folder) {
		this.#object_source = {
			item,
			folder
		}
	}

	drag_object_drop(folder: Folder) {
		if (this.#object_source && !this.have_error(folder)) {
			folder.add_item(this.#object_source.item)
			this.#object_source?.folder.delete_item(this.#object_source.item)
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
