
import {Flat, Signal, SignalTower} from "@benev/slate"

import {Layout} from "../layout/parts/types.js"
import {Tactic} from "../../../tools/tactic/sketch.js"
import {EditorBindings, default_editor_bindings} from "./default_editor_bindings.js"

export class InputController {

	focal: Signal<null | {
		leafId: Layout.Id | null
		paneId: Layout.Id
	}>

	pointerLock: Signal<null | {
		leafId: Layout.Id
	}>

	tactic: Tactic<EditorBindings>

	is_leaf_focal(leafId: Layout.Id) {
		return (leafId === this.focal.value?.leafId)
	}

	is_leaf_pointer_locked(leafId: Layout.Id) {
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
			devices: [new Tactic.Keyboard(window)],
			bindings: default_editor_bindings(),
		})
	}
}

