
import {Action} from "./parts/actions.js"
import {StateTree, WatchTower, ob} from "@benev/slate"

const history_limit = 1024

function trim_to_history_limit<X>(array: X[]) {
	while (array.length > history_limit)
		array.shift()
	return array
}

function save_snapshot(state: any) {
	return (history: HistoryState<any>) => {
		history.snapshots.push(structuredClone(state))
		trim_to_history_limit(history.snapshots)
		return history
	}
}

export interface HistoryState<S> {
	snapshots: S[]
	past: Action.Base[]
	future: Action.Base[]
}

export class Basis<S, Specs extends Action.Specs<S>> {
	#app: StateTree<S>
	#specs: Specs
	#history: StateTree<HistoryState<S>>

	get state() {
		return this.#app.state
	}

	get history() {
		return this.#history.state
	}

	actions: Action.Callers<Specs>
	#action_count = 0

	constructor(watch: WatchTower, app: StateTree<S>, specs: Specs) {
		this.#app = app
		this.#specs = specs
		this.#history = watch.stateTree<HistoryState<S>>({snapshots: [], past: [], future: []})

		this.actions = ob.map(this.#specs, (spec, purpose) => (payload: any) => {
			const action = {
				id: this.#action_count++,
				purpose: purpose as string,
				payload,
			} satisfies Action.Base

			this.#app.transmute(state => {
				this.#history.transmute(save_snapshot(state))
				return spec(state, payload)
			})

			this.#history.transmute(history => {
				history.past.push(action)
				history.future = []
				return history
			})
		})
	}

	undo() {
		this.#history.transmute(history => {
			if (history.past.length > 0 && history.snapshots.length > 0) {
				const action = history.past.pop()!
				const previous_state = history.snapshots.pop()!
				history.future.push(action)
				this.#app.transmute(() => previous_state)
			}
			else console.warn("undo failed, action or previous_state was missing")
			return history
		})
	}

	redo() {
		this.#history.transmute(history => {
			const action = history.future.pop()
			if (action) {
				const spec = this.#specs[action.purpose]

				if (!spec)
					throw new Error(`unknown action "${action.purpose}"`)

				this.#app.transmute(state => {
					save_snapshot(state)(history)
					return spec(state, action.payload)
				})

				history.past.push(action)
			}
			else console.warn("redo failed")
			return history
		})
	}
}

