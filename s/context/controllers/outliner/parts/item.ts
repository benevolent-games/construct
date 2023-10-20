
import {Id} from "../../graph/parts/types.js"

export namespace Item {
	export type Kind = "folder" | "prop" | "light"

	export interface Base {
		kind: Kind
		id: Id
		visible: boolean
	}

	export interface Folder extends Base {
		kind: "folder"
		name: string
		children: Whatever[]
	}

	export interface Prop extends Base {
		kind: "prop"
		name: string
	}

	export interface Light extends Base {
		kind: "light"
		name: string
	}

	export type Whatever = Folder | Prop | Light
}

