
import {Item} from "./domains/outline/types.js"
import {Id, freshId} from "../tools/fresh_id.js"

export interface State {
	outline: Item.Folder
	slots: GlbSlot[]
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

