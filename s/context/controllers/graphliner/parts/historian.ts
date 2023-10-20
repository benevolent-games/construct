
import {Action, ActionHandlers} from "./types.js"

export type Handlers = {
	[P in Action.Purpose]: ActionHandlers<any>
}

export class Historian<H extends Handlers> {
	#handlers: H
	#past: Action.Unknown[] = []
	#future: Action.Unknown[] = []
	#action_count = 0

	constructor(handlers: H) {
		this.#handlers = handlers
	}

	get new_action_id() {
		return this.#action_count
	}

	dispatch<A extends Action.Unknown>(action: A) {
		this.#handlers[action.purpose].do(action)
		this.#future = []
		this.#past.push(action)
	}

	undo() {
		if (this.#past.length > 0) {
			const action = this.#past.pop()!
			this.#future.push(action)
			this.#handlers[action.purpose].undo(action)
		}
	}

	redo() {
		if (this.#future.length > 0) {
			const action = this.#future.pop()!
			this.#past.push(action)
			this.#handlers[action.purpose].do(action)
		}
	}
}

