
import {PropAddress} from "../../controllers/catalog/parts/types.js"

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
		address: PropAddress
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
	parents: Item.Folder[]
}

