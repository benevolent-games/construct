
import {Id} from "../../graph/parts/types.js"

export interface Item {
	type: "folder" | "prop"
	id: Id
	name: string
}

export interface Folder extends Item {
	type: "folder"
	children: AnyItem[]
}

export interface Prop {
	type: "prop"
	unit: Id
}

export interface Light {
	type: "light"
}

export type AnyItem = Folder | Prop | Light

