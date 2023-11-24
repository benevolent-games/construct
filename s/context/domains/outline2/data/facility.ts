
import {Data} from "./namespace.js"

export class DataFacility<C extends Data.Concepts> {
	#config: Data.Config<C>

	constructor(config: Data.Config<C>) {
		this.#config = config
	}

	get kinds() {
		return Object.keys(this.#config) as any as keyof C
	}

	getConfig<K extends keyof C>(kind: K) {
		return this.#config[kind]
	}
}

////////////////////////

// export type ConceptsFromFacility<F extends DataFacility<any>> = (
// 	F extends DataFacility<infer C>
// 		? C
// 		: never
// )

