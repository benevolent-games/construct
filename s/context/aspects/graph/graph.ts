
import {pub} from "@benev/frog"
import {generateId} from "@benev/toolbox/x/utils/generate-id.js"

import {Id, Item} from "./parts/types.js"

export class Graph {
	#items = new Map<Id, Item>()
	#selection = new Set<Id>

	on = {
		item_added: pub<[Id, Item]>(),
		item_removed: pub<Id>(),
		item_selected: pub<Id>(),
		item_deselected: pub<Id>(),
	}

	get items() {
		return this.#items.entries()
	}

	get selection() {
		return this.#selection.values()
	}

	has(id: Id) {
		return this.#items.has(id)
	}

	add(item: Item) {
		const id = generateId()
		this.#items.set(id, item)
		this.on.item_added.publish([id, item])
	}

	remove(id: string) {
		this.#items.delete(id)
		this.on.item_removed.publish(id)
	}

	selected(id: Id) {
		return this.#selection.has(id)
	}

	select(id: Id) {
		this.#selection.add(id)
		this.on.item_selected.publish(id)
	}

	deselect(id: Id) {
		this.#selection.delete(id)
		this.on.item_deselected.publish(id)
	}
}

