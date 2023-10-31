
import {Flat, Signal, SignalTower} from "@benev/slate"

import {Id} from "../../../tools/fresh_id.js"
import {Tactic} from "../../../tools/tactic/sketch.js"
import {EditorBindings, default_editor_bindings} from "./default_editor_bindings.js"

export class InputController {

	focal: Signal<null | {
		leafId: Id | null
		paneId: Id
	}>

	pointerLock: Signal<null | {
		leafId: Id
	}>

	tactic: Tactic<EditorBindings>
	keyboard = new Tactic.Keyboard(window)
	pointerButtons = new Tactic.PointerButtons(window)
	pointerMovements = new Tactic.PointerMovements(window, "mouse")

	is_leaf_focal(leafId: Id) {
		return (leafId === this.focal.value?.leafId)
	}

	is_leaf_pointer_locked(leafId: Id) {
		return (leafId === this.pointerLock.value?.leafId)
	}

	constructor(
			public signals: SignalTower,
			public flat: Flat,
		) {

		this.focal = signals.signal(null)
		this.pointerLock = signals.signal(null)

		const clearPointerLock = () => { this.pointerLock.value = null }
		window.addEventListener("pointerlockchange", () => {
			if (!document.pointerLockElement)
				clearPointerLock()
		})
		window.addEventListener("pointerlockerror", clearPointerLock)

		this.tactic = new Tactic({
			flat,
			bindings: default_editor_bindings(),
			devices: [
				this.keyboard,
				this.pointerButtons,
				this.pointerMovements,
			],
		})
	}
}

