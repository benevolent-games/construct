
export class Modes<M extends keyof any> {
	#modes = new Set<M>()

	;[Symbol.iterator]() {
		return this.#modes.values()
	}

	isEnabled(mode: M) {
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

	set(...modes: M[]) {
		return this.wipe().enable(...modes)
	}
}

