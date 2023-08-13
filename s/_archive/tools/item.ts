import {Folder} from "./folder.js"
import {Publish} from "../components/types.js"

export class Item {
	id: string
	name: string
	parent: Folder
	selected? = false
	isVisible = true
	
	constructor({id, name, parent, selected}: {id: string, name: string, parent: Folder, selected?: boolean}) {
		this.id = id
		this.name = name
		this.parent = parent
		if(selected)
			this.selected = selected
	}

	setParent(parent: Folder) {
		this.parent = parent
	}

	select_item() {
		this.selected = true
	}

	deselect_item() {
		this.selected = false
	}

	toggle_visibility(publish: Publish) {
		this.isVisible = !this.isVisible
		publish()
	}

	set_item_name(name: string) {
		this.name = name
	}
}
