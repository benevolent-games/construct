
import {PropRef} from "../../catalog/parts/types.js"

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

	export type Report = {
		item: Whatever
		parent: Folder
	}
}

export namespace Action {
	export type Purpose = "add" | "delete" | "select" | "deselect"

	export interface Base {
		id: number
		purpose: Purpose
	}

	export interface AddAction<I extends Item.Whatever = Item.Whatever> extends Base {
		purpose: "add"
		parentId: Id
		draft: Omit<I, "id">
	}

	export interface DeleteAction extends Base {
		purpose: "delete"
		itemIds: Id[]
	}

	export interface SelectAction extends Base {
		purpose: "select"
		itemIds: Id[]
	}

	export interface DeselectAction extends Base {
		purpose: "deselect"
		itemIds: Id[]
	}

	export type Unknown = (
		| AddAction<Item.Whatever>
		| DeleteAction
		| SelectAction
		| DeselectAction
	)

	export type Actors<A extends Unknown> = {
		do: (action: A) => void
		undo: (action: A) => void
	}

	export function actors<A extends Unknown>(a: Actors<A>) {
		return a
	}
}

