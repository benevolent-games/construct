
import {Historian} from "./historian.js"
import {StateTree, ob} from "@benev/slate"

export namespace Action {
	export interface Base<P = any> {
		id: number
		purpose: string[]
		payload: P
		time: number
	}

	export type Spec<S, P> = (state: S, payload: P) => S
	export type GetPayload<Sp extends Spec<any, {}>> = Parameters<Sp>[1]

	export type Specs<S = any> = {
		[key: string]: Spec<S, any> | Specs<S>
	}

	export type Callers<Sp extends Specs> = {
		[K in keyof Sp]:
			Sp[K] extends Spec<any, any>
				? (payload: GetPayload<Sp[K]>) => void
				: Sp[K] extends Specs<any>
					? Callers<Sp[K]>
					: never
	}

	export class Helper<S> {
		action = <P>(
				fun: (state: S, payload: P) => void
			) => ((state, payload) => {
			fun(state, payload)
			return state
		}) as Action.Spec<S, P>

		action_that_writes_whole_new_state = (
			<Sp extends Action.Spec<S, any>>(spec: Sp) => spec
		)
	}

	export const specs = <S>() => (
		<Sp extends Action.Specs<S>>(fun: (helper: Helper<S>) => Sp) =>
			fun(new Helper())
	)

	export function callers<S, Sp extends Action.Specs<S>>(
			app: StateTree<S>,
			historian: Historian<S>,
			specs: Sp,
		): Callers<Sp> {

		let action_count = 1

		function recurse(specs: Specs<S>, purpose: string[]): any {
			return ob.map(specs, (spec, name) => (

				(typeof spec === "function")
					? (payload: any) => {
						const action = {
							id: action_count++,
							purpose: [...purpose, name as string],
							payload,
							time: Date.now(),
						} satisfies Action.Base

						app.transmute(state => {
							historian.save_snapshot()
							return spec(state, payload)
						})

						historian.proceed(action)
					}

					: recurse(spec, [...purpose, name as string])
			))
		}

		return recurse(specs, [])
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

