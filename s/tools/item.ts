import {Folder} from "./folder.js"

export class Item {
	id: string
	name: string
	parent: Folder
	selected? = false
	
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
}
