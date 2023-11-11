
import {Signal, signal} from "@benev/slate"

import {flows} from "./flows.js"
import {AnyFlow, FlowByName, FlowClassByName, FlowHandlers, FlowName, FlowOptions, MoreParams} from "./parts/types.js"

export class Flowchart {
	#flow: Signal<AnyFlow>

	get flow() {
		return this.#flow.value
	}

	get flowName() {
		const [name] = Object.entries(flows)
			.find(([,FlowClass]) => this.#flow.value instanceof FlowClass)!
		return name
	}

	constructor(private options: FlowOptions) {
		this.#flow = signal(null as any)
		this.assign("NormalFlow")
	}

	assign<N extends FlowName>(name: N, ...more: MoreParams<FlowClassByName<N>>) {
		const FlowClass = flows[name] as any
		const instance = new FlowClass(this.options, ...more)
		this.options.gesture.modes.assign(...instance.modes)
		this.#flow.value = instance
		return instance as FlowByName<N>
	}

	isActive<N extends FlowName>(name: N) {
		return this.flow instanceof flows[name]
	}

	handle<N extends FlowName, R>(
			name: N,
			fn: (situation: FlowByName<N>) => R,
		) {
		const FlowClass = flows[name]
		if (this.flow instanceof FlowClass)
			return fn(this.flow as any)
	}

	handlers(handlers: Partial<FlowHandlers>) {
		for (const [name, handler] of Object.entries(handlers)) {
			const FlowClass = flows[name as FlowName]
			if (this.flow instanceof FlowClass)
				return handler(this.flow)
		}
	}

	handle_all_flows(handlers: FlowHandlers) {
		for (const [name, handler] of Object.entries(handlers)) {
			const SituationClass = flows[name as FlowName]
			if (this.flow instanceof SituationClass)
				return handler(this.flow)
		}
	}
}

