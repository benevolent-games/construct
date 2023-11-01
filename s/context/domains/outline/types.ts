
import {Spatial} from "./spatial.js"
import {Id} from "../../../tools/fresh_id.js"
import {PropAddress} from "../../controllers/warehouse/parts/types.js"

export namespace Item {
	export type Kind = "folder" | "instance" | "light"

	export interface Base {
		kind: Kind
		id: Id
		name: string
		selected: boolean
		visible: boolean
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
		spatial: Spatial
	}

	export interface Light extends Base {
		kind: "light"
		name: string
		spatial: Spatial
	}

	export type Whatever = Folder | Instance | Light

	////////
	////////

	export type Report = {
		item: Item.Whatever
		parent: Item.Folder
		parents: Item.Folder[]
	}
}

