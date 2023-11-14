
import {Spatial} from "./spatial.js"
import {Id} from "../../../../tools/fresh_id.js"
import {PropAddress} from "../../../controllers/world/warehouse/parts/types.js"

export namespace Item {
	export type Kind = (
		| "container"
		| "prop"
		| "light"
	)

	export type Reference = {
		id: Id
		kind: Kind

		itemId: Id
		label: string

		visible: boolean
		selected: boolean
		spatial: Spatial | null
	}

	///////////////////////////////////////

	export interface Base {
		kind: Kind
		id: Id
		name: string
	}

	export interface Container extends Base {
		kind: "container"

		// reference ids
		children: Id[]
	}

	export interface Prop extends Base {
		kind: "prop"
		address: PropAddress
		collision: boolean
	}

	export interface Light extends Base {
		kind: "light"
	}

	///////////////////////////////////////

	export type Whatever = (
		| Container
		| Prop
		| Light
	)

	export type Report<I extends Whatever = Whatever> = {
		item: I
		parents: Container[]
	}
}

