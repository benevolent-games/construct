
import {Spatial} from "./spatial.js"
import {Id} from "../../../../tools/fresh_id.js"

export namespace Item {
	export type Kind = (
		| "container"
		| "prop"
		| "light"
	)

	///////////////////////////////////////

	export interface Base {
		kind: Kind
		id: Id
		name: string

		visible: boolean
		selected: boolean
	}

	export interface Container extends Base {
		kind: "container"
		spatial: Spatial | null
		children: Id[]
	}

	export interface Prop extends Base {
		kind: "prop"
		spatial: Spatial | null
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

	export type Report = {
		item: Whatever
		parents: Container[]
	}
}

