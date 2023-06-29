import {Folder} from "./folder.js"
import {Publish, FolderSource, ObjectSource, Thing} from "../components/types.js"

export class OutlinerManager {
	#folder_source: FolderSource | undefined
	#object_source: ObjectSource | undefined

	drag_folder_start(parent_folder: Folder, child_folder: Folder) {
		this.#folder_source = {
			parent_folder,
			child_folder
		}
	}

	drag_folder_drop(folder: Folder, publish: Publish) {
		if (this.#folder_source && !this.is_folder_dropped_to_same_folder(folder)) {
			folder.add_folder(this.#folder_source.child_folder)
			this.#folder_source.parent_folder
				.delete_folder(this.#folder_source.child_folder)
			publish()
		}
	}

	drag_folder_end() {
		this.#folder_source = undefined
	}

	is_folder_dropped_to_same_folder(folder: Folder) {
		if (
			this.#folder_source?.parent_folder.folders
				=== folder.folders
			|| folder === this.#folder_source?.child_folder
			|| this.#folder_source?.child_folder.folders.includes(folder)
		)
			return true
	}

	drag_object_start(object: Thing, folder: Folder) {
		this.#object_source = {
			object,
			folder
		}
	}

	drag_object_drop(folder: Folder, publish: Publish) {
		if (this.#object_source && !this.is_object_dropped_to_same_folder(folder)) {
			folder.add_object(this.#object_source.object)
			this.#object_source?.folder.delete_object(this.#object_source.object)
			publish()
		}
	}

	drag_object_end() {
		this.#object_source = undefined
	}

	is_object_dropped_to_same_folder(folder: Folder) {
		return this.#object_source?.folder === folder
	}
}
