
import {Action, Item} from "./controllers/graphliner/parts/types.js"

export interface EditorState {
	outline: Item.Folder
	history: {
		action_counter: number
		past: Action.Unknown[]
		future: Action.Unknown[]
	}
}

