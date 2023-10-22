
import {Historian} from "./historian.js"
import {StateTree, ob} from "@benev/slate"

export namespace Action {
	export interface Base<P = any> {
		id: number
		purpose: string
		payload: P
		time: number
	}

	export type Spec<S, P> = (state: S, payload: P) => S
	export type GetPayload<Sp extends Spec<any, {}>> = Parameters<Sp>[1]
	export type Specs<S = any> = {[key: string]: Spec<S, any>}

	export type Callers<Sp extends Specs> = {
		[K in keyof Sp]: (
			(payload: GetPayload<Sp[K]>) => void
		)
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
		<Specs extends Action.Specs>(fun: (helper: Helper<S>) => Specs) =>
			fun(new Helper())
	)

	export function callers<S, Sp extends Action.Specs<S>>(
			app: StateTree<S>,
			historian: Historian<S>,
			specs: Sp,
		) {

		let action_count = 1

		return ob.map(specs, (spec, purpose) => (payload: any) => {
			const action = {
				id: action_count++,
				purpose: purpose as string,
				payload,
				time: Date.now(),
			} satisfies Action.Base

			app.transmute(state => {
				historian.save_snapshot()
				return spec(state, payload)
			})

			historian.proceed(action)
		})
	}
}

