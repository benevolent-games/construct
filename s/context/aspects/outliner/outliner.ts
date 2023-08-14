
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

	constructor(flat: Flat, graph: Graph) {
		this.#state = flat.state({
			root: {
				id: generateId(),
				kind: "folder",
				name: "root",
				children: [],
			},
		})

		graph.on.added(this.#add)
		graph.on.removed(this.#remove)
		graph.on.selected(this.#selection_changed)
		graph.on.deselected(this.#selection_changed)
	}

	get root() {
		return this.#state.root
	}

	add(parent: Item.Folder, draft: Omit<Item.Folder, "id">) {
		const item = {
			...draft,
			id: generateId(),
		} as Item.Whatever
		parent.children.push(item)
		this.#update()
	}

	remove(parent: Item.Folder, id: Id) {
		// TODO remove item from folder by id
		this.#update()
	}

	#update() {
		this.#state.root = this.#state.root
	}

	#add = ([id, unit]: [Id, Unit]) => {
		this.root.children.push({
			kind: "prop",
			id,
			unit,
		})
		this.#update()
	}

	#remove = (id: Id) => {
		// remove the item from anywhere in the tree??
	}

	#selection_changed = () => {
		this.#update()
	}
}

