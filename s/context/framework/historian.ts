
import {StateTree, ZipAction, watch} from "@benev/slate"

import {Annals} from "./utils/annals.js"
import {HistoryAction} from "./history_action.js"
import {record_snapshot, trim_to_history_limit} from "./utils/history_tools.js"

export class Historian<S> {
	#annals: StateTree<Annals<S>>

	history = (() => {
		const getAnnals = () => this.#annals.state
		return {
			get annals() { return getAnnals() },
			undo: () => this.undo(),
			redo: () => this.redo(),
		}
	})()

	constructor(
			public app: StateTree<S>,
			public blueprint: ZipAction.Blueprint<S>,
		) {

		this.#annals = watch.stateTree<Annals<S>>({
			snapshots: [],
			past: [],
			future: [],
		})
	}

	save_snapshot() {
		this.#annals.transmute(annals => {
			record_snapshot(annals, this.app.state)
			return annals
		})
	}

	proceed(action: HistoryAction.Record) {
		this.#annals.transmute(annals => {
			annals.past.push(action)
			trim_to_history_limit(annals.past)
			annals.future = []
			return annals
		})
	}

	undo() {
		this.#annals.transmute(annals => {
			const {past, future, snapshots} = annals
			if (past.length > 0 && snapshots.length > 0) {
				const action = past.pop()!
				const previous_state = snapshots.pop()!
				future.push(action)
				this.app.transmute(() => previous_state)
			}
			return annals
		})
	}

	redo() {
		this.#annals.transmute(annals => {
			const action = annals.future.pop()
			if (action) {
				const spec = HistoryAction.find(this.blueprint, action.purpose) as ZipAction.Fn<S, any>

				if (!spec)
					throw new Error(`unknown action "${action.purpose}"`)

				this.app.transmute(state => {
					record_snapshot(annals, state)
					const setState = (newState: S) => { state = newState }
					spec(state, setState)(...action.params)
					return state
				})

				annals.past.push(action)
			}
			return annals
		})
	}
}

