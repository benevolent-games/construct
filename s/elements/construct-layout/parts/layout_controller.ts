
import {Layout} from "./layout.js"
import {find_layout_node} from "./find_layout_node.js"
import {WalkMission, walk_layout} from "./walk_layout.js"

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

	find_pane(pane_path: number[]) {
		const pane_index = pane_path.at(-1)!
		const pane = this.find(pane_path) as Layout.Pane
		const parent_cell = this.find(parent(pane_path)) as Layout.Cell
		return {pane, pane_index, parent_cell}
	}

	find_leaf(leaf_path: number[]) {
		const leaf_index = leaf_path.at(-1)!
		const parent_pane = this.find(parent(leaf_path)) as Layout.Pane
		const leaf = this.find(leaf_path) as Layout.Leaf
		return {leaf, leaf_index, parent_pane}
	}

	split_pane(pane_path: number[]) {
		const {pane, pane_index, parent_cell} = this.find_pane(pane_path)
		parent_cell.children.splice(pane_index, 1, {
			kind: "cell",
			size: undefined,
			vertical: !parent_cell.vertical,
			children: [pane, {
				kind: "pane",
				size: undefined,
				children: [],
				active_leaf_index: undefined,
			}],
		})
		this.#on_change()
	}

	delete_leaf(leaf_path: number[]) {
		const {leaf_index, parent_pane} = this.find_leaf(leaf_path)
		parent_pane.children.splice(leaf_index, 1)
		this.#on_change()
	}

	add_leaf(pane_path: number[], tab: Layout.Tab) {
		const {pane} = this.find_pane(pane_path)
		pane.children.push({kind: "leaf", tab})
		this.#on_change()
	}

	set_pane_active_leaf(pane_path: number[], active_leaf_index: number | undefined) {
		const {pane} = this.find_pane(pane_path)
		pane.active_leaf_index = active_leaf_index
		this.#on_change()
	}
}

// utils

function parent(path: number[]) {
	return path.slice(0, path.length - 1)
}

