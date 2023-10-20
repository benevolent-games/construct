
import {pub} from "@benev/slate"
import {generateId} from "@benev/toolbox/x/utils/generate-id.js"

import {Id, Unit} from "./parts/types.js"

export class Graph {
	#units = new Map<Id, Unit>()
	#selection = new Set<Id>()

	on = {
		added: pub<[Id, Unit]>(),
		removed: pub<Id>(),

		selected: pub<Id>(),
		deselected: pub<Id>(),

		visible: pub<Id>(),
		invisible: pub<Id>(),
	}

	listen(listeners: {[P in keyof typeof this.on]: Parameters<typeof this.on[P]>[0]}) {
		const unsubs: (() => void)[] = []
		for (const [name, listener] of Object.entries(listeners))
			this.on[name as keyof typeof this.on](listener as any)
		return () => unsubs.forEach(u => u())
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
		return id
	}

	remove(id: string) {
		if (this.selected(id))
			this.deselect(id)
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

