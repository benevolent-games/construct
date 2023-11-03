
import {Tree} from "../tree/controller.js"
import {Id} from "../../../tools/fresh_id.js"

import {Signal, SignalTower} from "@benev/slate"
import {make_outline_tools} from "../../domains/outline/tools.js"

export type Grabbed = {
	itemIds: Id[]
}

export class Mover {
	grabbed: Signal<Grabbed | null>

	constructor(signals: SignalTower, private tree: Tree) {
		this.grabbed = signals.signal(null)
	}

	toggleGrab() {
		if (this.grabbed.value)
			this.#ungrab()
		else
			this.#grab()
	}

	#grab() {
		const tools = make_outline_tools(this.tree.state.outline)
		const itemIds = tools.selected.map(item => item.id)
		this.grabbed.value = itemIds.length > 0
			? {itemIds}
			: null
	}

	#ungrab() {
		this.grabbed.value = null
	}
}

