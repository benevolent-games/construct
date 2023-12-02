
import {Id, freshId} from "../tools/fresh_id.js"
import {Data} from "./domains/outline2/data/namespace.js"
import {OutlineState} from "./domains/outline2/types/state.js"

export interface BaseState {
	outline: OutlineState<Data.Concepts>
	slots: GlbSlot[]
}

export const default_state = (): BaseState => ({
	outline: {
		blocks: [],
		references: [],
		root: [],
		isolated: null,
	},
	slots: [],
})

//////
//////
//////

export type Hash = string

export interface GlbSlot {
	id: Id
	name: string
	glb_hash: Hash | null
}

