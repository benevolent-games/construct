
import {initFn} from "@benev/slate"
import {V2, v2} from "@benev/toolbox/x/utils/v2.js"
import {Gesture} from "../../../context/controllers/gesture/controller"

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

export const look_vector_wired_for_inputs = (
		gesture: Gesture,
	) => initFn(() => {

	let lookVector = new LookVector({
		sensitivity: 1 / 1000,
		invertX: false,
		invertY: false,
	})

	return [
		lookVector,
		gesture.on.fps.vectors.look(
			input => lookVector.accumulate(input.vector)
		),
	]
})

