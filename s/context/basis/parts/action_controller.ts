
// import {Action} from "./actions.js"
// import {StateTree, ob} from "@benev/slate"

// export class ActionController<S, Specs extends Action.Specs> {
// 	#specs: Specs
// 	#action_count = 0

// 	dispatchers: {
// 		[P in keyof Specs]: (
// 			(...p: Parameters<Specs[P]["dispatch"]>) => (
// 				ReturnType<Action.Base & Specs[P]["dispatch"]>
// 			)
// 		)
// 	}

// 	constructor({specs}: {
// 			tree: StateTree<S>
// 			specs: Specs
// 		}) {
// 		this.#specs = specs
// 		this.dispatchers = ob.map(specs, (spec, purpose) => (...args) => {
// 			const action = {
// 				...spec.dispatch(...(args as any)),
// 				id: this.#action_count++,
// 				purpose,
// 			}
// 			return action
// 		})
// 	}
// }

