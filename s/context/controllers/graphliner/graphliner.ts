
import {generateId} from "@benev/toolbox/x/utils/generate-id.js"

import {context} from "../../context.js"
import {Action, Id, Item} from "./parts/types.js"

export class Graphliner {
	#root = context.tower.signal<Item.Folder>({
		name: "root",
		kind: "folder",
		id: generateId(),
		selected: false,
		children: [],
	})

	#index = context.tower.computed(() => {
		const root = this.#root.value
		const reports: Item.Report[] = []

		function recurse(
				item: Item.Whatever,
				parent: Item.Folder,
			) {
			reports.push({item, parent})
			if (item.kind === "folder")
				for (const child of item.children)
					recurse(child, item)
		}

		for (const item of root.children)
			recurse(item, root)

		const items = reports.map(report => report.item)

		const folders = [
			root,
			...items.filter(item => item.kind === "folder"),
		] as Item.Folder[]

		const instances = items
			.filter(item => item.kind === "instance") as Item.Instance[]

		const lights = items
			.filter(item => item.kind === "light") as Item.Light[]

		const selected = items
			.filter(item => item.selected) as Item.Whatever[]

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

	find_folder(id: Id) {
		return this.folders.find(folder => folder.id === id)
	}

	#history: Action.Unknown[] = []

	act(action: Action.Unknown) {
		this.#history.push(action)
	}

	#add(parentId: Id, draft: Omit<Item.Whatever, "id">) {
		const item = {
			...draft,
			id: generateId(),
		} as Item.Whatever

		const folder = this.find_folder(parentId)

		if (!folder)
			throw new Error("folder not found")

		folder.children.push(item)
		this.#update()
	}

	#delete(itemIds: Id[]) {
		for (const id of itemIds) {
			const found = this.find(id)
			if (found) {
				found.parent.children = (
					found.parent.children.filter(item => item.id !== id)
				)
			}
		}
		this.#update()
	}

	actions = {
		add: Action.actors<Action.AddAction>({
			do: action => {},
			undo: action => {},
			// do: action => this.#add(action.parentId, action.draft),
			// undo: action => this.#delete([action]),
		}),
		delete: Action.actors<Action.DeleteAction>({
			do: action => {},
			undo: action => {},
		}),
		select: Action.actors<Action.SelectAction>({
			do: action => {},
			undo: action => {},
		}),
		deselect: Action.actors<Action.DeselectAction>({
			do: action => {},
			undo: action => {},
		}),
	}

	// add<I extends Item.Whatever>(parent: Item.Folder, draft: Omit<I, "id">) {
	// 	const item = {...draft, id: generateId()} as Item.Whatever
	// 	parent.children.push(item)
	// 	this.#update()
	// }

	// delete(id: Id) {
	// 	const found = this.find(id)
	// 	if (found) {
	// 		found.parent.children = (
	// 			found.parent.children.filter(item => item.id !== id)
	// 		)
	// 		this.#update()
	// 	}
	// }

	// select(id: Id) {
	// 	const found = this.find(id)
	// 	if (found) {
	// 		found.item.selected = true
	// 		this.#update()
	// 	}
	// }

	// deselect(id: Id) {
	// 	const found = this.find(id)
	// 	if (found) {
	// 		found.item.selected = false
	// 		this.#update()
	// 	}
	// }
}
