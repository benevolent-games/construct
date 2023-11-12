
import {Signal, SignalListener, signal, watch} from "@benev/slate"

import {Id} from "../../../tools/fresh_id.js"
import {Item} from "../../domains/outline/types.js"
import {OutlineStuff, compute_outline_stuff} from "./utils/compute_outline_stuff.js"

export class OutlineGenius {
	#stuff: Signal<OutlineStuff>
	onChange: (listener: SignalListener<OutlineStuff>) => void

	constructor(param: Item.Folder | (() => Item.Folder)) {
		if (typeof param === "function")
			this.#stuff = watch.computed(() => compute_outline_stuff(param()))
		else
			this.#stuff = signal(compute_outline_stuff(param))

		this.onChange = this.#stuff.subscribe.bind(this.#stuff)
	}

	get root() { return this.#stuff.value.root }
	get reports() { return this.#stuff.value.reports }
	get items() { return this.#stuff.value.items }

	get folders() { return this.#stuff.value.folders }
	get instances() { return this.#stuff.value.instances }
	get lights() { return this.#stuff.value.lights }
	get selected() { return this.#stuff.value.selected }

	isSelected(id: Id) {
		return this.selected.some(item => item.id === id)
	}

	isApparent(id: Id) {
		const isRoot = id === this.root.id
		if (isRoot) {
			return this.root.visible
		}
		else {
			const {item, parents} = this.reports.find(({item}) => item.id === id)!
			return item.visible && parents.every(parent => parent.visible)
		}
	}

	getItem(id: Id) {
		const item = this.items.find(item => item.id === id)
		if (!item)
			throw new Error(`item not found ${id}`)
		return item
	}

	getFolder(id: Id) {
		const folder = this.folders.find(folder => folder.id === id)
		if (!folder)
			throw new Error(`folder not found ${id}`)
		return folder
	}
}

