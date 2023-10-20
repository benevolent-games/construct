
import {generateId} from "@benev/toolbox/x/utils/generate-id.js"

import {context} from "../../context.js"
import {Historian} from "./parts/historian.js"
import {Action, Id, Item, ItemChange, ItemReport, actionHandlers} from "./parts/types.js"

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
		const reports: ItemReport[] = []

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

	// #get_item_report(id: Id) {
	// 	const report = this.reports.find(report => report.item.id === id)
	// 	if (!report)
	// 		throw new Error(`item report not found ${id}`)
	// 	return report
	// }

	#get_item(id: Id) {
		const item = this.items.find(item => item.id === id)
		if (!item)
			throw new Error(`item not found ${id}`)
		return item
	}

	#get_folder(id: Id) {
		const folder = this.folders.find(folder => folder.id === id)
		if (!folder)
			throw new Error(`folder not found ${id}`)
		return folder
	}

	#add(changes: ItemChange[]) {
		for (const {folderId, item} of changes) {
			const folder = this.#get_folder(folderId)
			folder.children.push(item)
		}
		this.#update()
	}

	#delete(changes: ItemChange[]) {
		for (const {folderId, item} of changes) {
			const folder = this.#get_folder(folderId)
			folder.children = folder.children.filter(child => child.id !== item.id)
		}
		this.#update()
	}

	#select(itemIds: Id[]) {
		for (const id of itemIds)
			this.#get_item(id).selected = true
		this.#update()
	}

	#deselect(itemIds: Id[]) {
		for (const id of itemIds)
			this.#get_item(id).selected = false
		this.#update()
	}

	history = new Historian({
		add: actionHandlers<Action.Add>({
			do: action => this.#add(action.changes),
			undo: action => this.#delete(action.changes),
		}),
		delete: actionHandlers<Action.Delete>({
			do: action => this.#delete(action.changes),
			undo: action => this.#add(action.changes),
		}),
		select: actionHandlers<Action.Select>({
			do: action => this.#select(action.itemIds),
			undo: action => this.#deselect(action.itemIds),
		}),
		deselect: actionHandlers<Action.Deselect>({
			do: action => this.#deselect(action.itemIds),
			undo: action => this.#select(action.itemIds),
		}),
	})

	add(...changes: ItemChange[]) {
		this.history.dispatch<Action.Add>({
			id: this.history.new_action_id,
			purpose: "add",
			changes,
			label: (changes.length > 1 || changes.length === 0)
				? `add ${changes.length} items`
				: `add ${changes[0].item.name}`
		})
	}

	delete(...changes: ItemChange[]) {
		this.history.dispatch<Action.Delete>({
			id: this.history.new_action_id,
			purpose: "delete",
			changes,
			label: (changes.length > 1 || changes.length === 0)
				? `delete ${changes.length} items`
				: `delete ${changes[0].item.name}`
		})
	}

	select(...itemIds: Id[]) {
		this.history.dispatch<Action.Select>({
			id: this.history.new_action_id,
			purpose: "select",
			itemIds,
			label: (itemIds.length > 1 || itemIds.length === 0)
				? `select ${itemIds.length} items`
				: `select ${this.#get_item(itemIds[0]).name}`
		})
	}

	deselect(...itemIds: Id[]) {
		this.history.dispatch({
			id: this.history.new_action_id,
			purpose: "deselect",
			itemIds,
			label: (itemIds.length > 1 || itemIds.length === 0)
				? `deselect ${itemIds.length} items`
				: `deselect ${this.#get_item(itemIds[0]).name}`
		})
	}
}

