
import {Item} from "./domains/outline/types.js"
import {generateId} from "@benev/toolbox/x/utils/generate-id.js"

export type Hash = string

export interface GlbSlot {
	id: Item.Id
	name: string
	glb_hash: Hash | null
}

export interface State {
	outline: Item.Folder
	slots: GlbSlot[]
}

export const default_state = (): State => ({
	outline: {
		id: generateId(),
		name: "root",
		kind: "folder",
		visible: true,
		selected: false,
		children: [],
	},
	slots: [],
})

