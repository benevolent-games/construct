
import {Historian} from "./historian.js"
import {StateTree, ob} from "@benev/slate"

export namespace Action {
	export interface Base<P extends any[] = any[]> {
		id: number
		purpose: string[]
		params: P
		time: number
	}

	export type Spec<S, P extends any[]> = (state: S) => (...params: P) => S
	export type GetParams<Sp extends Spec<any, any[]>> = Parameters<ReturnType<Sp>>

	export type Specs<S = any> = {
		[key: string]: Spec<S, any> | Specs<S>
	}

	export type Callers<Sp extends Specs> = {
		[K in keyof Sp]:
			Sp[K] extends Spec<any, any>
				? (...params: GetParams<Sp[K]>) => void
				: Sp[K] extends Specs<any>
					? Callers<Sp[K]>
					: never
	}

	export class Helper<S> {
		action = <P extends any[]>(
				fun: (state: S) => (...params: P) => void
			) => ((state: S) => (...params: P) => {
			fun(state)(...params)
			return state
		}) as Action.Spec<S, P>

		action_that_writes_whole_new_state = (
			<Sp extends Action.Spec<S, any>>(spec: Sp) => spec
		)
	}

	export const fast = <S, P extends any[]>(
			fun: (state: S) => (...params: P) => void
		) => (
		(state: S) => (...params: P) => {
			fun(state)(...params)
			return state
		}
	)

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
					? (...params: any[]) => {
						const action = {
							id: action_count++,
							purpose: [...purpose, name as string],
							params,
							time: Date.now(),
						} satisfies Action.Base

						app.transmute(state => {
							historian.save_snapshot()
							return spec(state)(...params)
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

