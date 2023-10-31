
import {V2} from "@benev/toolbox/x/utils/v2.js"
import {Flat, Pub, ob, pub} from "@benev/slate"

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

export abstract class Device {
	onInput = pub<Input.Whatever>()
	abstract dispose: () => void
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

export class PointerButtons extends Device {
	static determine_mouse_button(event: MouseEvent) {
		switch (event.button) {
			case 0: return "LMB"
			case 1: return "MMB"
			case 2: return "RMB"
			default: return `MB${event.button + 1}`
		}
	}

	dispose: () => void

	constructor(target: EventTarget) {
		super()

		const handler = ({down}: {down: boolean}) => (event: PointerEvent) => {
			this.onInput.publish({
				down,
				kind: "button",
				code: PointerButtons.determine_mouse_button(event),
			})
		}

		const pointerdown = handler({down: true})
		const pointerup = handler({down: false})

		target.addEventListener("pointerdown", pointerdown as any)
		target.addEventListener("pointerup", pointerup as any)

		this.dispose = () => {
			target.removeEventListener("keydown", pointerdown as any)
			target.removeEventListener("keyup", pointerup as any)
		}
	}
}

export class PointerMovements extends Device {
	dispose: () => void
	movement: V2 = [0, 0]
	coordinates: V2 = [0, 0]

	constructor(target: EventTarget, channel: string) {
		super()

		const listener = (event: PointerEvent) => {
			this.coordinates = [
				event.clientX,
				event.clientY,
			]

			const movement: V2 = [
				event.movementX,
				event.movementY,
			]

			this.movement = movement

			this.onInput.publish({
				kind: "vector",
				vector: movement,
				channel,
			})
		}

		target.addEventListener("pointermove", listener as any)

		this.dispose = () => {
			target.removeEventListener("pointermove", listener as any)
		}
	}
}

export interface Bindings {
	buttons: {[key: string]: string}
	vectors: {[key: string]: string}
}

export class Tactic<B extends Bindings> {
	static Keyboard = Keyboard
	static PointerButtons = PointerButtons
	static PointerMovements = PointerMovements

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
			vectors: ob.map(bindings.vectors, () => pub()) as any,
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

