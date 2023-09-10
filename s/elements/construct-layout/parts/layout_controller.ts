
import {Layout} from "./layout.js"
import {IdBooth} from "../../../tools/id_booth.js"
import {find_layout_node} from "./find_layout_node.js"

export interface LayoutControllerOptions {
	id_booth: IdBooth
	on_change: () => void
	on_leaf_added: (leaf: Layout.Leaf, path: number[]) => void
	on_leaf_deleted: (leaf: Layout.Leaf, path: number[]) => void
}

export class LayoutController {
	#root: Layout.Cell
	#options: LayoutControllerOptions

	get root() {
		return this.#root
	}

	constructor(layout: Layout.Cell, options: LayoutControllerOptions) {
		this.#root = layout
		this.#options = options
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
			size: pane.size,
			vertical: !parent_cell.vertical,
			children: [pane, {
				kind: "pane",
				size: 50,
				children: [],
				active_leaf_index: undefined,
			}],
		})
		this.#options.on_change()
	}

	delete_leaf(leaf_path: number[]) {
		const {leaf, leaf_index, parent_pane} = this.find_leaf(leaf_path)
		parent_pane.children.splice(leaf_index, 1)
		this.#options.on_change()
		this.#options.on_leaf_deleted(leaf, leaf_path)
	}

	add_leaf(pane_path: number[], tab: Layout.Tab) {
		const {pane} = this.find_pane(pane_path)
		const id = this.#options.id_booth.next()
		const leaf: Layout.Leaf = {id, kind: "leaf", tab}
		pane.children.push(leaf)
		const leaf_path = [...pane_path, pane.children.length - 1]
		this.#options.on_change()
		this.#options.on_leaf_added(leaf, leaf_path)
		return leaf_path
	}

	set_pane_active_leaf(pane_path: number[], active_leaf_index: number | undefined) {
		const {pane} = this.find_pane(pane_path)
		pane.active_leaf_index = active_leaf_index
		this.#options.on_change()
	}
}

// utils

function parent(path: number[]) {
	return path.slice(0, path.length - 1)
}

