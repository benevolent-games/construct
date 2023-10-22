
export namespace Action {
	export interface Base<P = any> {
		id: number
		purpose: string
		payload: P
	}

	export type Spec<S, P> = (state: S, payload: P) => S
	export type GetPayload<Sp extends Spec<any, {}>> = Parameters<Sp>[1]
	export type Specs<S = any> = {[key: string]: Spec<S, any>}

	export type Callers<Sp extends Specs> = {
		[K in keyof Sp]: (
			(payload: GetPayload<Sp[K]>) => void
		)
	}
}

export class ActionHelper<S> {
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

export const actions = <S>() => (
	<Specs extends Action.Specs>(fun: (helper: ActionHelper<S>) => Specs) =>
		fun(new ActionHelper())
)

