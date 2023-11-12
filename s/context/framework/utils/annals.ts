
import {HistoryAction} from "../history_action.js"

export interface Annals<S> {
	snapshots: S[]
	past: HistoryAction.Record[]
	future: HistoryAction.Record[]
}

