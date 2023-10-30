
import {V2} from "@benev/toolbox/x/utils/v2.js"
import {Flat, Pub, Signal, SignalTower, ob, pub} from "@benev/slate"

export namespace Input {
	export type Kind = "button" | "vector"

	export interface Base {
		kind: Kind
	}

	export interface Button extends Base {
		kind: "button"
		code: string
		down: boolean
	}

	export interface Vector extends Base {
		kind: "vector"
		channel: string
		vector: V2
	}

	export type Whatever = Button | Vector
}

export class Device {
	onInput = pub<Input.Whatever>()
}

export class Keyboard extends Device {
	dispose: () => void

	constructor(target: EventTarget) {
		super()

		const handler = ({down}: {down: boolean}) => (event: KeyboardEvent) => {
			this.onInput.publish({
				down,
				kind: "button",
				code: event.code,
			})
		}

		const keydown = handler({down: true})
		const keyup = handler({down: false})

		target.addEventListener("keydown", keydown as any)
		target.addEventListener("keyup", keyup as any)

		this.dispose = () => {
			target.removeEventListener("keydown", keydown as any)
			target.removeEventListener("keyup", keyup as any)
		}
	}
}

export interface Bindings {
	buttons: {[key: string]: string}
	vectors: {[key: string]: string}
}

export type Report<I extends Input.Whatever> = {
	input: Signal<I | undefined>
	on: Pub<I>
}

export class Tactic<B extends Bindings> {
	static Keyboard = Keyboard

	#devices = new Map<Device, () => void>()

	bindings: B
	readonly buttons: Record<keyof B["buttons"], boolean>
	readonly vectors: Record<keyof B["vectors"], V2>
	on: {
		buttons: Record<keyof B["buttons"], Pub<Input.Button>>
		vectors: Record<keyof B["vectors"], Pub<Input.Vector>>
	}

	constructor({flat, bindings, devices = []}: {
			flat: Flat
			bindings: B
			devices?: Device[]
		}) {

		this.bindings = bindings
		this.add(...devices)

		this.buttons = flat.state(ob.map(bindings.buttons, () => false)) as any
		this.vectors = flat.state(ob.map(bindings.vectors, () => [0, 0])) as any

		this.on = {
			buttons: ob.map(bindings.buttons, () => pub()) as any,
			vectors: ob.map(bindings.buttons, () => pub()) as any,
		}
	}

	readonly input = (input: Input.Whatever) => {
		switch (input.kind) {
			case "button":
				for (const [key, value] of Object.entries(this.bindings.buttons)) {
					if (value === input.code) {
						this.buttons[key as any] = input.down
						this.on.buttons[key as any].publish(input)
					}
				}
				break
			case "vector":
				for (const [key, value] of Object.entries(this.bindings.vectors)) {
					if (value === input.channel) {
						this.vectors[key as any] = input.vector
						this.on.vectors[key as any].publish(input)
					}
				}
				break
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

