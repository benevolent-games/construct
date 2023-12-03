
import {Signal, pub, signal} from "@benev/slate"

import {Binds} from "../../../../tools/impulse/binds.js"
import {Focalization, PointerLock} from "./parts/types.js"
import {Impulse} from "../../../../tools/impulse/impulse.js"

export class Gesture<B extends Binds> extends Impulse<B> {
	keyboard = new Impulse.Keyboard(window)
	pointerButtons = new Impulse.PointerButtons(window)
	pointerMovements = new Impulse.PointerMovements(window, "mouse")

	focal: Signal<null | Focalization>
	pointerLock: Signal<null | PointerLock>
	on_pointer_lock_disengaged = pub<void>()

	constructor(options: {binds: B}) {
		super(options)

		this.focal = signal(null)
		this.pointerLock = signal(null)

		const stopPointerLock = () => {
			if (!document.pointerLockElement)
				this.disengage_pointer_lock()
		}

		document.addEventListener("pointerlockchange", stopPointerLock)
		document.addEventListener("pointerlockerror", stopPointerLock)

		this.add(
			this.keyboard,
			this.pointerButtons,
			this.pointerMovements,
		)
	}

	engage_pointer_lock(lock: PointerLock, on_disengaged = () => {}) {
		if (this.pointerLock.value || document.pointerLockElement)
			throw new Error("invalid double pointerlock")
		this.on_pointer_lock_disengaged.once(on_disengaged)
		this.pointerLock.value = lock
		lock.element.requestPointerLock()
	}

	disengage_pointer_lock() {
		document.exitPointerLock()
		this.pointerLock.value = null
		this.on_pointer_lock_disengaged.publish()
	}
}

