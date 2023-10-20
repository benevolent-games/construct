
import {pub} from "@benev/slate"
import {generateId} from "@benev/toolbox/x/utils/generate-id.js"

import {context} from "../../context.js"
import {PropRef} from "../catalog/parts/types.js"

export class Graphliner {
	#root = context.tower.signal<Item.Folder>({
		name: "root",
		kind: "folder",
		id: generateId(),
		selected: false,
		children: [],
	})

	#index = context.tower.computed(() => {
		const reports: {
			item: Item.Whatever
			parent: Item.Folder
		}[] = []

		function recurse(
				item: Item.Whatever,
				parent: Item.Folder,
			) {
			reports.push({item, parent})
			if (item.kind === "folder")
				for (const child of item.children)
					recurse(child, item)
		}

		for (const item of this.#root.value.children)
			recurse(item, this.#root.value)

		const items = reports.map(report => report.item)
		const folders = items.filter(item => item.kind === "folder")
		const instances = items.filter(item => item.kind === "instance")
		const lights = items.filter(item => item.kind === "light")
		const selected = items.filter(item => item.selected)

		return {reports, items, folders, instances, lights, selected}
	})

	get root() {
		return this.#root.value
	}

	#update() {
		this.#root.publish()
	}

	get reports() { return this.#index.value.reports }
	get items() { return this.#index.value.items }
	get folders() { return this.#index.value.folders }
	get instances() { return this.#index.value.instances }
	get lights() { return this.#index.value.lights }
	get selected() { return this.#index.value.selected }

	find(id: Id) {
		return this.reports.find(report => report.item.id === id)
	}

	events = {
		added: pub<Item.Whatever>(),
		deleted: pub<Item.Whatever>(),
		selected: pub<Item.Whatever>(),
		deselected: pub<Item.Whatever>(),
	}

	add(parent: Item.Folder, draft: Omit<Item.Whatever, "id">) {
		const item = {...draft, id: generateId()} as Item.Whatever
		parent.children.push(item)
		this.events.added.publish(item)
		this.#update()
	}

	delete(id: Id) {
		const found = this.find(id)
		if (found) {
			found.parent.children = (
				found.parent.children.filter(item => item.id !== id)
			)
			this.events.deleted.publish(found.item)
			this.#update()
		}
	}

	select(id: Id) {
		const found = this.find(id)
		if (found) {
			found.item.selected = true
			this.events.selected.publish(found.item)
			this.#update()
		}
	}

	deselect(id: Id) {
		const found = this.find(id)
		if (found) {
			found.item.selected = false
			this.events.deselected.publish(found.item)
			this.#update()
		}
	}
}

// utils

export type Id = string

export namespace Item {
	export type Kind = "folder" | "instance" | "light"

	export interface Base {
		kind: Kind
		id: Id
		selected: boolean
	}

	export interface Folder extends Base {
		kind: "folder"
		name: string
		children: Whatever[]
	}

	export interface Instance extends Base {
		kind: "instance"
		name: string
		ref: PropRef
	}

	export interface Light extends Base {
		kind: "light"
		name: string
	}

	export type Whatever = Folder | Instance | Light
}

