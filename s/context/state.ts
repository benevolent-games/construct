
import {Item} from "./domains/outline/types.js"
import {Id, freshId} from "../tools/fresh_id.js"
import {Data} from "./domains/outline2/data/namespace.js"
import {OutlineState} from "./domains/outline2/types/state.js"

export interface State {
	outline2: OutlineState<Data.Concepts>
	slots: GlbSlot[]

	outline: Item.Folder
}

//////
//////
//////

export type Hash = string

export interface GlbSlot {
	id: Id
	name: string
	glb_hash: Hash | null
}

export const default_state = (): State => ({
	outline2: {
		blocks: [],
		references: [],
		root: [],
		isolated: null,
	},
	outline: {
		id: freshId(),
		name: "root",
		kind: "folder",
		visible: true,
		selected: false,
		children: [],
	},
	slots: [],
})

