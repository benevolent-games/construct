
import {Action} from "../action_namespace.js"

export interface Annals<S> {
	snapshots: S[]
	past: Action.Base[]
	future: Action.Base[]
}

