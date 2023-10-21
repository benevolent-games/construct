
import {context} from "../../context.js"
import {EditorState} from "../../state.js"
import {Action, ActionHandlers, Id, Item, ItemChange, ItemReport, actionHandlers} from "../graphliner/parts/types.js"

const memory_limit = 1024

export function outline_breakdown(outline: EditorState["outline"]) {
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

	for (const item of outline.children)
		recurse(item, outline)

	const items = reports.map(report => report.item)

	const folders = [
		outline,
		...items.filter(item => item.kind === "folder"),
	] as Item.Folder[]

	const instances = items
		.filter(item => item.kind === "instance") as Item.Instance[]

	const lights = items
		.filter(item => item.kind === "light") as Item.Light[]

	const selected = items
		.filter(item => item.selected) as Item.Whatever[]

	return {
		reports,
		items,
		folders,
		instances,
		lights,
		selected,
		getItem(id: Id) {
			const item = items.find(item => item.id === id)
			if (!item)
				throw new Error(`item not found ${id}`)
			return item
		},
		getFolder(id: Id) {
			const folder = folders.find(folder => folder.id === id)
			if (!folder)
				throw new Error(`folder not found ${id}`)
			return folder
		},
	}
}

export function outline_mutators(outline: EditorState["outline"]) {
	const breakdown = outline_breakdown(outline)
	const {items, folders, getItem, getFolder} = breakdown
	return {
		...breakdown,
		add(changes: ItemChange[]) {
			for (const {folderId, item} of changes) {
				const folder = getFolder(folderId)
				folder.children.push(item)
			}
		},
		delete(changes: ItemChange[]) {
			for (const {folderId, item} of changes) {
				const folder = getFolder(folderId)
				folder.children = folder.children.filter(child => child.id !== item.id)
			}
		},
		select(itemIds: Id[]) {
			for (const id of itemIds)
				getItem(id).selected = true
		},
		deselect(itemIds: Id[]) {
			for (const id of itemIds)
				getItem(id).selected = false
		},
	}
}

export class Domain {
	get outline() {
		return context.tree.state.outline
	}

	get history() {
		return context.tree.state.history
	}

	#index = context.watch.computed(
		() => outline_breakdown(context.tree.state.outline)
	)
	get reports() { return this.#index.value.reports }
	get items() { return this.#index.value.items }
	get folders() { return this.#index.value.folders }
	get instances() { return this.#index.value.instances }
	get lights() { return this.#index.value.lights }
	get selected() { return this.#index.value.selected }

	#action_count = 0

	#handling = (mut: ReturnType<typeof outline_mutators>): {
			[P in Action.Purpose]: ActionHandlers<any>
		} => ({

		add: actionHandlers<Action.Add>({
			do: action => mut.add(action.changes),
			undo: action => mut.delete(action.changes),
		}),
		delete: actionHandlers<Action.Delete>({
			do: action => mut.delete(action.changes),
			undo: action => mut.add(action.changes),
		}),
		select: actionHandlers<Action.Select>({
			do: action => mut.select(action.itemIds),
			undo: action => mut.deselect(action.itemIds),
		}),
		deselect: actionHandlers<Action.Deselect>({
			do: action => mut.deselect(action.itemIds),
			undo: action => mut.select(action.itemIds),
		}),
	})

	#dispatch<A extends Action.Unknown>(action: A) {
		context.tree.transmute(state => {
			this.#handling(outline_mutators(state.outline))
				[action.purpose]
				.do(action)
			state.history.future = []
			state.history.past.push(action)
			return state
		})
	}

	undo() {
		context.tree.transmute(state => {
			const action = state.history.past.pop()
			if (action) {
				state.history.future.push(action)
				this.#handling(outline_mutators(state.outline))
					[action.purpose]
					.undo(action)
			}
			return state
		})
	}

	redo() {
		context.tree.transmute(state => {
			const action = state.history.future.pop()
			if (action) {
				state.history.past.push(action)
				while(state.history.past.length > memory_limit)
					state.history.past.shift()
				this.#handling(outline_mutators(state.outline))
					[action.purpose]
					.do(action)
			}
			return state
		})
	}

	actions = {
		add: (...changes: ItemChange[]) => {
			this.#dispatch<Action.Add>({
				id: this.#action_count++,
				purpose: "add",
				changes,
				label: (changes.length > 1 || changes.length === 0)
					? `add ${changes.length} items`
					: `add ${changes[0].item.name}`
			})
		},
		delete: (...changes: ItemChange[]) => {
			this.#dispatch<Action.Delete>({
				id: this.#action_count++,
				purpose: "delete",
				changes,
				label: (changes.length > 1 || changes.length === 0)
					? `delete ${changes.length} items`
					: `delete ${changes[0].item.name}`
			})
		},
		select: (...itemIds: Id[]) => {
			this.#dispatch<Action.Select>({
				id: this.#action_count++,
				purpose: "select",
				itemIds,
				label: (itemIds.length > 1 || itemIds.length === 0)
					? `select ${itemIds.length} items`
					: `select ${this.#index.value.getItem(itemIds[0]).name}`
			})
		},
		deselect: (...itemIds: Id[]) => {
			this.#dispatch({
				id: this.#action_count++,
				purpose: "deselect",
				itemIds,
				label: (itemIds.length > 1 || itemIds.length === 0)
					? `deselect ${itemIds.length} items`
					: `deselect ${this.#index.value.getItem(itemIds[0]).name}`
			})
		},
	}
}

