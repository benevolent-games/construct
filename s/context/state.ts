
import {Item} from "./domains/outline/types.js"
import {generateId} from "@benev/toolbox/x/utils/generate-id.js"

export interface State {
	outline: Item.Folder
}

export const default_state = (): State => ({
	outline: {
		id: generateId(),
		name: "root",
		kind: "folder",
		selected: false,
		children: [],
	},
})

