
import {Item} from "../controllers/graphliner/parts/types.js"
import {generateId} from "@benev/toolbox/x/utils/generate-id.js"

export interface AppState {
	outline: Item.Folder
}

export const default_app_state = (): AppState => ({
	outline: {
		id: generateId(),
		name: "root",
		kind: "folder",
		selected: false,
		children: [],
	},
})

