
import {Flat} from "@benev/frog"
import {generateId} from "@benev/toolbox/x/utils/generate-id.js"

import {Item} from "./parts/item.js"
import {Graph} from "../graph/graph.js"
import {Id, Unit} from "../graph/parts/types.js"

export type OutlinerState = {
	root: Item.Folder
}

export class Outliner {
	#state: OutlinerState
	#graph: Graph

	constructor(flat: Flat, graph: Graph) {
		this.#state = flat.state({
			root: {
				id: generateId(),
				kind: "folder",
				isVisible: true,
				name: "root",
				children: [],
			},
		})

		this.#graph = graph
		graph.on.added(this.#add)
		graph.on.removed(this.#remove)
		graph.on.selected(this.#selection_changed)
		graph.on.deselected(this.#selection_changed)
	}

	get root() {
		return this.#state.root
	}

	add(folder: Item.Folder, draft: Omit<Item.Folder, "id">) {
		const item = {
			...draft,
			id: generateId(),
		} as Item.Whatever
		folder.children.push(item)
		this.#update()
	}

	remove(id: Id) {
		this.#graph.remove(id)
	}

	#update() {
		this.#state.root = this.#state.root
	}

	set_visibility(item: Item.Whatever, parent?: Item.Folder) {
		item.isVisible = parent ? parent.isVisible : !item.isVisible
		if(item.kind === "folder") {
			item.children.forEach(child => this.set_visibility(child, item))
		}
		this.#update()
	}

	#add = ([id, unit]: [Id, Unit]) => {
		this.root.children.push({
			kind: "prop",
			id,
			unit,
			isVisible: true
		})
		this.#update()
	}

	#remove = (id: Id) => {
		this.root.children = this.#find_and_remove_by_id(this.root, id)!
		this.#update()
	}

	#find_and_remove_by_id(folder: Item.Folder, id: string) {
		const found = folder.children.find(c => c.id === id)
		if(found) return folder.children.filter(c => c.id !== id)
		else folder.children.forEach(c => c .kind === "folder"
			? this.#find_and_remove_by_id(c, id)
			: null)
	}

	#selection_changed = () => {
		this.#update()
	}
}

