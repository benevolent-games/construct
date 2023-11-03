
import {Flat, Signal, SignalTower, pub} from "@benev/slate"

import {Tactic} from "../../../tools/tactic/sketch.js"
import {Focalization, PointerLock} from "./parts/types.js"
import {EditorBindings, default_editor_bindings} from "./default_editor_bindings.js"

export class Gesture extends Tactic<EditorBindings> {
	keyboard = new Tactic.Keyboard(window)
	pointerButtons = new Tactic.PointerButtons(window)
	pointerMovements = new Tactic.PointerMovements(window, "mouse")

	focal: Signal<null | Focalization>
	pointerLock: Signal<null | PointerLock>
	on_pointer_lock_disengaged = pub<void>()

	constructor(
			public signals: SignalTower,
			public flat: Flat,
		) {

		super({
			flat,
			bindings: default_editor_bindings(),
		})

		this.focal = signals.signal(null)
		this.pointerLock = signals.signal(null)

		const stopPointerLock = () => {
			if (!document.pointerLockElement)
				this.disengage_pointer_lock()
		}

		window.addEventListener("pointerlockchange", stopPointerLock)
		window.addEventListener("pointerlockerror", stopPointerLock)

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

