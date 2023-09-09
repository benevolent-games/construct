
import {Layout} from "./layout.js"
import {find_layout_node} from "./find_layout_node.js"
import { WalkMission, walk_layout } from "./walk_layout.js"

export class LayoutController {
	#root: Layout.Cell
	#on_change: () => void

	get root() {
		return this.#root
	}

	constructor(layout: Layout.Cell, on_change: () => void) {
		this.#root = layout
		this.#on_change = on_change
	}

	walk<T>(mission: WalkMission<T>) {
		return walk_layout<T>(this.#root, mission)
	}

	find(path: number[]) {
		return find_layout_node(this.#root, path)
	}

	split(path: number[]) {
		const pane_index = path.at(-1)!
		const pane = this.find(path) as Layout.Pane
		const parent_cell = this.find(path.slice(0, path.length - 1)) as Layout.Cell

		parent_cell.children.splice(pane_index, 1, {
			kind: "cell",
			size: undefined,
			vertical: !parent_cell.vertical,
			children: [pane, {
				kind: "pane",
				size: undefined,
				children: [],
			}],
		})

		this.#on_change()
	}
}

