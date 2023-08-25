import {Item} from "../context/controllers/outliner/parts/item"

interface ItemSource {
	parent: Item.Folder
	item: Item.Whatever
}

export class outliner_drag_drop {
	#item_source: ItemSource | undefined

	start(parent: Item.Folder, item: Item.Whatever) {
		this.#item_source = {
			parent,
			item
		}
	}

	drop(item: Item.Whatever) {
		if(item.kind === "folder")
		if (this.#item_source && !this.#have_error(item)) {
			this.#add(item, this.#item_source.item)
			this.#remove(
				this.#item_source.parent,
				this.#item_source.item
			)
		}
	}

	end() {
		this.#item_source = undefined
	}

	#have_error(folder: Item.Folder) {
		const item = this.#item_source!.item
		if(item.kind === "folder") {
		return this.#is_child_dropped_to_parent(folder) ||
			this.#is_dropped_to_child_folder(item, folder) ||
			this.#is_dropped_to_itself(folder)
		}	else return this.#is_prop_dropped_to_same_folder(folder)
	}

	#is_prop_dropped_to_same_folder(folder: Item.Folder) {
		return this.#item_source?.parent === folder
	}

	#is_dropped_to_child_folder(source_folder: Item.Folder, folder: Item.Folder) {
		return source_folder.children.includes(folder)
	}

	#is_dropped_to_itself(folder: Item.Folder) {
		return folder === this.#item_source?.item
	}

	#is_child_dropped_to_parent(folder: Item.Folder) {
		return this.#item_source?.parent.children === folder.children
	}

	#add(add_to: Item.Folder, item: Item.Whatever) {
		add_to.children.push(item)
	}

	#remove(remove_from: Item.Folder, item: Item.Whatever) {
		const filtered = remove_from.children.filter(c => c !== item)
		remove_from.children = filtered
	}
}
