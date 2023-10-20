
import {GlbRef, PropRef} from "../../catalog/parts/types.js"

export type Id = string

export namespace Item {
	export type Kind = "folder" | "instance" | "light"

	export interface Base {
		kind: Kind
		id: Id
		selected: boolean
		name: string
	}

	export interface Folder extends Base {
		kind: "folder"
		name: string
		children: Whatever[]
	}

	export interface Instance extends Base {
		kind: "instance"
		name: string
		glb: GlbRef
	}

	export interface Light extends Base {
		kind: "light"
		name: string
	}

	export type Whatever = Folder | Instance | Light
}

export type ItemReport = {
	item: Item.Whatever
	parent: Item.Folder
}

export type ItemChange = {
	folderId: Id
	item: Item.Whatever
}

export namespace Action {
	export type Purpose = "add" | "delete" | "select" | "deselect"

	export interface Base {
		id: number
		purpose: Purpose
		label: string
	}

	export interface Add extends Base {
		purpose: "add"
		changes: ItemChange[]
	}

	export interface Delete extends Base {
		purpose: "delete"
		changes: ItemChange[]
	}

	export interface Select extends Base {
		purpose: "select"
		itemIds: Id[]
	}

	export interface Deselect extends Base {
		purpose: "deselect"
		itemIds: Id[]
	}

	export type Unknown = (
		| Add
		| Delete
		| Select
		| Deselect
	)
}

export type ActionHandlers<A extends Action.Unknown> = {
	do: (action: A) => void
	undo: (action: A) => void
}

export function actionHandlers<A extends Action.Unknown>(
	a: ActionHandlers<A>) {
	return a
}

