
import {Flat, Signal, SignalTower, pub} from "@benev/slate"

import {Impulse} from "../../../tools/impulse/impulse.js"
import {Focalization, PointerLock} from "./parts/types.js"
import {EditorBinds, editor_binds} from "./editor_binds.js"

export class Gesture extends Impulse<EditorBinds> {
	keyboard = new Impulse.Keyboard(window)
	pointerButtons = new Impulse.PointerButtons(window)
	pointerMovements = new Impulse.PointerMovements(window, "mouse")

	focal: Signal<null | Focalization>
	pointerLock: Signal<null | PointerLock>
	on_pointer_lock_disengaged = pub<void>()

	constructor(
			public signals: SignalTower,
			public flat: Flat,
		) {

		super({
			flat,
			binds: editor_binds(),
		})

		// TODO mode handling
		this.modes
			.enable("always")
			.enable("fps")
			.enable("plain")
			.enable("flycam")
			.enable("selectable")
			.enable("operation")

		this.focal = signals.signal(null)
		this.pointerLock = signals.signal(null)

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

