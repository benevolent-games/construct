
import {V2, v2} from "@benev/toolbox/x/utils/v2.js"

export class LookVector {
	#look = v2.zero()
	#sensitivity: number
	#invert: V2

	constructor(options: {
			sensitivity: number
			invertX: boolean
			invertY: boolean
		}) {
		this.#sensitivity = options.sensitivity
		this.#invert = [
			options.invertX ?-1 :1,
			options.invertY ?1 :-1,
		]
	}

	accumulate(more: V2) {
		this.#look = v2.add(this.#look, more)
	}

	grab_and_reset() {
		const vector = this.#look
		this.#look = v2.zero()
		return v2.multiplyBy(
			v2.multiply(vector, this.#invert),
			this.#sensitivity,
		)
	}
}

