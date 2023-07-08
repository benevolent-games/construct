import {Folder} from "./folder.js"
import {FolderSource, Publish} from "../components/types.js"

export class FoldersDragDropManager {
	#folder_source: FolderSource | undefined

	drag_folder_start(parent_folder: Folder, child_folder: Folder) {
		this.#folder_source = {
			parent_folder,
			child_folder
		}
	}

	drag_folder_drop(folder: Folder) {
		if (this.#folder_source && !this.have_error(folder)) {
			folder.add_folder(this.#folder_source.child_folder)
			this.#folder_source.parent_folder
				.delete_folder(this.#folder_source.child_folder)
		}
	}

	drag_folder_end() {
		this.#folder_source = undefined
	}

	have_error(folder: Folder) {
		return this.is_child_dropped_to_parent(folder) ||
			this.is_dropped_to_child_folder(folder) ||
			this.is_dropped_to_itself(folder)
	}

	is_dropped_to_child_folder(folder: Folder) {
		return this.#folder_source?.child_folder.folders.includes(folder)
	}
	is_dropped_to_itself(folder: Folder) {
		return folder === this.#folder_source?.child_folder
	}
	is_child_dropped_to_parent(folder: Folder) {
		return this.#folder_source?.parent_folder.folders === folder.folders
	}
}
