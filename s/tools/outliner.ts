
import {pub} from "@benev/frog"
import {Folder} from "./folder.js"
import {Item} from "./item.js"

export class Outliner {

	events = {
		on_item_add: pub<Item>(),
		on_item_remove: pub<Item>(),
		on_folder_remove: pub<Item[]>(),
		on_item_select: pub<Item[]>(),
		on_item_deselect: pub<Item[]>()
	}

	tree = new Folder(this.events)
}
