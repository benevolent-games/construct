
import {pub} from "@benev/frog"
import {generateId} from "@benev/toolbox/x/utils/generate-id.js"

import {Id, Unit} from "./parts/types.js"

export class Graph {
	#units = new Map<Id, Unit>()
	#selection = new Set<Id>

	on = {
		added: pub<[Id, Unit]>(),
		removed: pub<Id>(),
		selected: pub<Id>(),
		deselected: pub<Id>(),
	}

	get items() {
		return this.#units.entries()
	}

	get selection() {
		return this.#selection.values()
	}

	has(id: Id) {
		return this.#units.has(id)
	}

	add(item: Unit) {
		const id = generateId()
		this.#units.set(id, item)
		this.on.added.publish([id, item])
	}

	remove(id: string) {
		this.#units.delete(id)
		this.on.removed.publish(id)
	}

	selected(id: Id) {
		return this.#selection.has(id)
	}

	select(id: Id) {
		this.#selection.add(id)
		this.on.selected.publish(id)
	}

	deselect(id: Id) {
		this.#selection.delete(id)
		this.on.deselected.publish(id)
	}
}

