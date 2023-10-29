
import {Signal, SignalTower} from "@benev/slate"

import {Layout} from "../layout/parts/types.js"
import {Tactic} from "../../../tools/tactic/sketch.js"
import {EditorBindings, default_editor_bindings} from "./default_editor_bindings.js"

export class InputController {
	focal: Signal<null | {
		leafId: Layout.Id | null
		paneId: Layout.Id
	}>

	tactic: Tactic<EditorBindings>

	is_leaf_focal(leafId: Layout.Id) {
		return (leafId === this.focal.value?.leafId)
	}

	constructor(
			public signals: SignalTower,
		) {

		this.focal = signals.signal(null)

		this.tactic = new Tactic({
			signals: this.signals,
			devices: [new Tactic.Keyboard(window)],
			bindings: default_editor_bindings(),
		})
	}
}

