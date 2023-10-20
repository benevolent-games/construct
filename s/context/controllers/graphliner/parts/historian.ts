
import {context} from "../../../context.js"
import {Action, ActionHandlers} from "./types.js"

export type Handlers = {
	[P in Action.Purpose]: ActionHandlers<any>
}

const memory_limit = 1024

export class Historian<H extends Handlers> {
	#handlers: H
	#past = context.tower.signal<Action.Unknown[]>([])
	#future = context.tower.signal<Action.Unknown[]>([])
	#action_count = 0

	constructor(handlers: H) {
		this.#handlers = handlers
	}

	get new_action_id() {
		return this.#action_count++
	}

	get past() {
		return [...this.#past.value]
	}

	get future() {
		return [...this.#future.value]
	}

	dispatch<A extends Action.Unknown>(action: A) {
		this.#do_action(action)
		this.#wipe_the_future()
		this.#add_to_past(action)
	}

	undo() {
		const action = this.#step_backward()
		if (action)
			this.#rollback_action(action)
	}

	redo() {
		const action = this.#step_forward()
		if (action)
			this.#do_action(action)
	}

	//
	// utilities
	//

	#do_action(action: Action.Unknown) {
		this.#handlers[action.purpose].do(action)
	}

	#rollback_action(action: Action.Unknown) {
		this.#handlers[action.purpose].undo(action)
	}

	#wipe_the_future() {
		this.#future.value = []
	}

	#add_to_past(action: Action.Unknown) {
		const new_past = [...this.#past.value, action]
		while (new_past.length > memory_limit)
			new_past.shift()
		this.#past.value = new_past
	}

	#add_to_future(action: Action.Unknown) {
		const new_future = [...this.#future.value, action]
		this.#future.value = new_future
	}

	#step_backward() {
		const action = this.#past.value.pop()
		this.#past.publish()
		if (action)
			this.#add_to_future(action)
		return action
	}

	#step_forward() {
		const action = this.#future.value.pop()
		this.#future.publish()
		if (action)
			this.#add_to_past(action)
		return action
	}
}

