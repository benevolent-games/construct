
import {Flat, Pub, ob, pub} from "@benev/slate"
import {V2, v2} from "@benev/toolbox/x/utils/v2.js"

import {Input} from "./input.js"
import {Device} from "./device.js"
import {Modes} from "./parts/modes.js"
import {Binds, Mode} from "./binds.js"
import {Keyboard} from "./devices/keyboard.js"
import {PointerButtons} from "./devices/pointer_buttons.js"
import {PointerMovements} from "./devices/pointer_movements.js"
import {input_matches_button, input_matches_vector} from "./parts/matching.js"

export class Impulse<B extends Binds> {
	static Keyboard = Keyboard
	static PointerButtons = PointerButtons
	static PointerMovements = PointerMovements

	#devices = new Map<Device, () => void>()

	binds: B
	readonly modes = new Modes<Mode<B>>()

	readonly report: {
		[M in keyof B]: {
			buttons: {[P in keyof B[M]["buttons"]]: boolean}
			vectors: {[P in keyof B[M]["vectors"]]: V2}
		}
	}

	readonly on: {
		[M in keyof B]: {
			buttons: {[P in keyof B[M]["buttons"]]: Pub<Input.Button>}
			vectors: {[P in keyof B[M]["vectors"]]: Pub<Input.Vector>}
		}
	}

	constructor({flat, binds, devices = []}: {
			flat: Flat
			binds: B
			devices?: Device[]
		}) {

		this.binds = binds
		this.add(...devices)

		this.report = ob.map(
			binds,
			({buttons, vectors}) => ({
				buttons: flat.state(ob.map(buttons, () => false)) as any,
				vectors: flat.state(ob.map(vectors, () => v2.zero())) as any,
			}),
		)

		this.on = ob.map(
			binds,
			({buttons, vectors}) => ({
				buttons: ob.map(buttons, () => pub()) as any,
				vectors: ob.map(vectors, () => pub()) as any,
			}),
		)
	}

	readonly input = (input: Input.Whatever) => {
		for (const mode of this.modes) {
			switch (input.kind) {
				case "button":
					for (const [name, btns] of Object.entries(this.binds[mode].buttons)) {
						if (input_matches_button(input, btns)) {
							;(this.report[mode].buttons as any)[name] = input.down
							this.on[mode].buttons[name].publish(input)
						}
					}
					break
				case "vector":
					for (const [name, channels] of Object.entries(this.binds[mode].vectors)) {
						if (input_matches_vector(input, channels)) {
							;(this.report[mode].vectors as any)[name] = input.vector
							this.on[mode].vectors[name].publish(input)
						}
					}
					break
			}
		}
	}

	add(...devices: Device[]) {
		for (const device of devices)
			if (!this.#devices.has(device))
				this.#devices.set(device, device.onInput(this.input))
		return this
	}

	remove(...devices: Device[]) {
		for (const device of devices) {
			const stop = this.#devices.get(device)
			if (stop) {
				stop()
				this.#devices.delete(device)
			}
		}
		return this
	}

	clear() {
		for (const device of [...this.#devices.keys()])
			this.remove(device)
		return this
	}
}

