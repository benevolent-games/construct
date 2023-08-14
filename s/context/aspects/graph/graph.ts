
import {pub} from "@benev/frog"
import {generateId} from "@benev/toolbox/x/utils/generate-id.js"

import {Id, Item} from "./parts/types.js"

export class Graph {
	#items = new Map<Id, Item>()
	#selection = new Set<Id>

	events = {
		on_item_added: pub<[Id, Item]>(),
		on_item_removed: pub<Id>(),
		on_item_selected: pub<Id>(),
		on_item_deselected: pub<Id>(),
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
		this.events.on_item_added.publish([id, item])
	}

	remove(id: string) {
		this.#items.delete(id)
		this.events.on_item_removed.publish(id)
	}

	selected(id: Id) {
		return this.#selection.has(id)
	}

	select(id: Id) {
		this.#selection.add(id)
		this.events.on_item_selected.publish(id)
	}

	deselect(id: Id) {
		this.#selection.delete(id)
		this.events.on_item_deselected.publish(id)
	}
}

