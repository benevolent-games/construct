
import {generateId} from "@benev/toolbox/x/utils/generate-id.js"

import {Item} from "./parts/item.js"
import {Graph} from "../graph/graph.js"
import {context} from "../../context.js"

export class Outliner {
	#root = context.tower.signal<Item.Folder>({
		id: generateId(),
		kind: "folder",
		name: "root",
		children: [],
		visible: true,
	})

	constructor(graph: Graph) {
		graph.listen({
			added: ([id, unit]) => console.log("outliner added", id, unit),
			removed: id => console.log("outliner removed", id),
			selected: id => console.log("outliner selected", id),
			deselected: id => console.log("outliner deselected", id),
			visible: id => console.log("outliner visible", id),
			invisible: id => console.log("outliner invisible", id),
		})
	}

	get root() {
		return this.#root.value
	}

	#update() {
		this.#root.publish()
	}

	create_folder(parent: Item.Folder, draft: Omit<Item.Folder, "id">) {
		const item = {...draft, id: generateId()} as Item.Folder
		parent.children.push(item)
		this.#update()
	}
}

// 	set_visibility(item: Item.Whatever, parent?: Item.Folder) {
// 		item.visible = parent ? parent.visible : !item.visible
// 		if(item.kind === "folder") {
// 			item.children.forEach(child => this.set_visibility(child, item))
// 		}
// 		this.#update()
// 	}

// 	#add = ([id, unit]: [Id, Unit]) => {
// 		this.root.children.push({
// 			kind: "prop",
// 			id,
// 			unit,
// 			isVisible: true
// 		})
// 		this.#update()
// 	}

// 	#remove = (id: Id) => {
// 		this.root.children = this.#find_and_remove_by_id(this.root, id)!
// 		this.#update()
// 	}

// 	#find_and_remove_by_id(folder: Item.Folder, id: string) {
// 		const found = folder.children.find(c => c.id === id)
// 		if(found) return folder.children.filter(c => c.id !== id)
// 		else folder.children.forEach(c => c.kind === "folder"
// 			? this.#find_and_remove_by_id(c, id)
// 			: null)
// 	}

// 	#selection_changed = () => {
// 		this.#update()
// 	}
// }

