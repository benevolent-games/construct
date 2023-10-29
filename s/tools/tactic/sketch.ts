
import {Pub, Signal, SignalTower, pub} from "@benev/slate"

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
		x: number
		y: number
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
	readonly buttons: {[P in keyof B["buttons"]]: Report<Input.Button>}
	readonly vectors: {[P in keyof B["vectors"]]: Report<Input.Vector>}

	constructor({signals, bindings, devices = []}: {
			signals: SignalTower
			bindings: B
			devices?: Device[]
		}) {

		this.bindings = bindings
		this.add(...devices)

		const report = (): Report<any> => ({
			input: signals.signal(undefined),
			on: pub(),
		})

		this.buttons = Object.fromEntries(
			Object.entries(bindings.buttons).map(([key]) => [key, report()])
		) as any

		this.vectors = Object.fromEntries(
			Object.entries(bindings.vectors).map(([key]) => [key, report()])
		) as any
	}

	readonly input = (input: Input.Whatever) => {
		switch (input.kind) {
			case "button":
				for (const [key, value] of Object.entries(this.bindings.buttons)) {
					if (value === input.code) {
						const report = this.buttons[key]
						report.input.value = input
						report.on.publish(input)
					}
				}
				break
			case "vector":
				for (const [key, value] of Object.entries(this.bindings.vectors)) {
					if (value === input.channel) {
						const report = this.vectors[key]
						report.input.value = input
						report.on.publish(input)
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

