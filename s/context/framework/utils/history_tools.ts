
import {Annals} from "./annals"

const history_limit = 256

export function trim_to_history_limit<X>(array: X[]) {
	while (array.length > history_limit)
		array.shift()
	return array
}

export function record_snapshot(history: Annals<any>, state: any) {
	history.snapshots.push(structuredClone(state))
	trim_to_history_limit(history.snapshots)
}

