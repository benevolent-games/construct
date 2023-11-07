
import {Mode} from "../binds.js"

export class Modes<M extends Mode<any>> {
	#modes = new Set<M>()

	;[Symbol.iterator]() {
		return this.#modes.values()
	}

	enabled(mode: M) {
		return this.#modes.has(mode)
	}

	enable(...modes: M[]) {
		for (const mode of modes)
			this.#modes.add(mode)
		return this
	}

	disable(...modes: M[]) {
		for (const mode of modes)
			this.#modes.delete(mode)
		return this
	}

	wipe() {
		this.#modes.clear()
		return this
	}
}

