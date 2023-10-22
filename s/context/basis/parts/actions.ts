
export namespace Action {
	export interface Primitive {
		purpose: string
	}

	export interface Base extends Primitive {
		id: number
	}

	export type MakeAction<P extends any[], A extends {}> = (...params: P) => A
	export type MutateState<S, A extends {}> = (state: S, action: Action.Base & A) => S

	export interface Spec<
			S,
			P extends any[],
			A extends {},
		> {
		make_action: MakeAction<P, A>
		mutate_state: MutateState<S, A>
	}

	export type Specs<S = any> = {[key: string]: Spec<S, any, any>}

	export type Callers<Sp extends Specs> = {
		[P in keyof Sp]: (
			(...p: Parameters<Sp[P]["make_action"]>) => void
		)
	}
}

export class ActionHelper<S> {
	action = <P extends any[], A extends {}>(
		spec: Action.Spec<S, P, A>,
	) => spec

	// insta = <A extends {}>(
	// 	fun: (state: S) => (action: A) => void
	// ) => {}
}

export const actions = <S>() => (
	<Specs extends Action.Specs>(fun: (helper: ActionHelper<S>) => Specs) =>
		fun(new ActionHelper())
)

