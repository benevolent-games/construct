
import {Action} from "./parts/actions.js"
import {StateTree, WatchTower, ob} from "@benev/slate"

const history_limit = 1024

export interface HistoryState<S> {
	snapshots: S[]
	past: Action.Base[]
	future: Action.Base[]
}

export class Basis<S, Specs extends Action.Specs<S>> {
	#tree: StateTree<S>
	#specs: Specs
	#history: StateTree<HistoryState<S>>

	get state() {
		return this.#tree.state
	}

	get history() {
		return this.#history.state
	}

	#save_snapshot(state: S) {
		this.#history.transmute(history => {
			history.snapshots.push(structuredClone(state))
			while (history.snapshots.length > history_limit)
				history.snapshots.shift()
			return history
		})
	}

	actions: Action.Callers<Specs>
	#action_count = 0

	constructor(watch: WatchTower, tree: StateTree<S>, specs: Specs) {
		this.#tree = tree
		this.#specs = specs
		this.#history = watch.stateTree<HistoryState<S>>({snapshots: [], past: [], future: []})
		this.#save_snapshot(this.#tree.state)

		this.actions = ob.map(this.#specs, (spec, purpose) => (...args: any[]) => {
			const action = {
				...spec.make_action(...args),
				id: this.#action_count++,
				purpose,
			} satisfies Action.Base

			this.#tree.transmute(state => {
				this.#save_snapshot(state)
				return spec.mutate_state(state, action)
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
			const action = history.past.pop()
			const previous_state = history.snapshots.pop()
			if (action && previous_state) {
				history.future.push(action)
				this.#tree.transmute(() => previous_state)
			}
			return history
		})
	}

	redo() {
		this.#history.transmute(history => {
			const action = history.future.pop()
			if (action) {
				const spec = this.#specs[action.purpose]
				this.#tree.transmute(state => {
					this.#save_snapshot(state)
					return spec.mutate_state(state, action)
				})
				history.past.push(action)
			}
			return history
		})
	}
}

