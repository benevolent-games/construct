
import {Id, freshId} from "../tools/fresh_id.js"
import {Item} from "./domains/outline/types.js"

export type Hash = string

export interface GlbSlot {
	id: Id
	name: string
	glb_hash: Hash | null
}

export interface State {
	outline: Item.Folder
	slots: GlbSlot[]
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

