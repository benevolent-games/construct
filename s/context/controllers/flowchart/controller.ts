
import {Signal} from "@benev/slate"

import {flows} from "./flows.js"
import {AnyFlow, FlowByName, FlowHandlers, FlowName, FlowOptions} from "./parts/types.js"

export class Flowchart {
	#flow: Signal<AnyFlow>

	get flow() {
		return this.#flow.value
	}

	constructor(private options: FlowOptions) {
		this.#flow = options.signals.signal(null as any)
		this.assign("NormalFlow")
	}

	assign<N extends FlowName>(name: N) {
		const FlowClass = flows[name]
		const instance = new FlowClass(this.options)
		this.options.gesture.modes.set(...instance.modes)
		this.#flow.value = instance
		return instance as FlowByName<N>
	}

	handle<N extends FlowName, R>(
			name: N,
			fn: (situation: FlowByName<N>) => R,
		) {
		const FlowClass = flows[name]
		if (this.flow instanceof FlowClass)
			return fn(this.flow as any)
	}

	handlers<R = void>(handlers: Partial<FlowHandlers<R>>) {
		for (const [name, handler] of Object.entries(handlers)) {
			const FlowClass = flows[name as FlowName]
			if (this.flow instanceof FlowClass)
				return handler(this.flow)
		}
	}

	handle_all_flows<R = void>(handlers: FlowHandlers<R>) {
		for (const [name, handler] of Object.entries(handlers)) {
			const SituationClass = flows[name as FlowName]
			if (this.flow instanceof SituationClass)
				return handler(this.flow)
		}
	}
}

