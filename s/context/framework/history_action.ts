
import {Historian} from "./historian.js"
import {StateTree, ZipAction, ob} from "@benev/slate"

export namespace HistoryAction {
	export interface Record<P extends any[] = any[]> {
		id: number
		purpose: string[]
		params: P
		time: number
	}

	export function actualize<S, B extends ZipAction.Blueprint<S>>(
			app: StateTree<S>,
			historian: Historian<S>,
			blueprint: B,
		): ZipAction.Callable<B> {

		let action_count = 1

		function recurse(specs: ZipAction.Blueprint<S>, purpose: string[]): any {
			return ob.map(specs, (spec, name) => (

				(typeof spec === "function")

					? (...params: any[]) => {
						const action = {
							id: action_count++,
							purpose: [...purpose, name as string],
							params,
							time: Date.now(),
						} satisfies HistoryAction.Record

						app.transmute(state => {
							historian.save_snapshot()
							const setState = (newState: S) => { state = newState }
							spec(state, setState)(...params)
							return state
						})

						historian.proceed(action)
					}

					: recurse(spec, [...purpose, name as string])
			))
		}

		return recurse(blueprint, [])
	}

	export function find<T>(obj: any, purpose: string[]): T | undefined {
		let current: any = obj
		for (const key of purpose) {
			if (current[key] === undefined)
				return undefined
			current = current[key]
		}
		return current as T
	}
}

