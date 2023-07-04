import {Item} from "./item.js"
import {Original, OutlinerEvents, Publish} from "../components/types.js"

export class Folder {
	name = "folder"
	folders: Folder[] = []
	originals: Original[] = []
	instances: Item[] = []
	#outliner_events

	constructor(events: OutlinerEvents) {
		this.#outliner_events = events
	}

	delete_folder(sourceFolder: Folder) {
		const filtered = this.folders.filter(folder => folder !== sourceFolder)
		this.folders = filtered
		this.#outliner_events.on_folder_remove.publish(sourceFolder.instances)
	}

	create_folder(folder: Folder, publish: Publish) {
		folder.folders = [...this.folders, new Folder(this.#outliner_events)]
		publish()
	}

	add_folder(folder: Folder) {
		this.folders = [...this.folders, folder]
	}

	add_item(item: Item) {
		item.setParent(this)
		this.instances = [...this.instances, item]
		this.#outliner_events.on_item_add.publish(item)
	}

	delete_item(item: Item) {
		const itemFolder = item.parent
		const filtered = itemFolder.instances.filter(instance => instance !== item)
		itemFolder.instances = filtered
		this.#outliner_events.on_item_remove.publish(item)
	}

	select_items() {
		this.instances.forEach(instance => instance.selected = true)
	}
}
