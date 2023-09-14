
import {Layout} from "./layout.js"
import {IdBooth} from "../../../tools/id_booth.js"
import {find_layout_node} from "./find_layout_node.js"

export interface LayoutControllerOptions {
	id_booth: IdBooth
	on_change: () => void
	on_reset: (layout: LayoutController) => void
	on_leaf_added: (leaf: Layout.Leaf, path: number[]) => void
	on_leaf_deleted: (leaf: Layout.Leaf, path: number[]) => void
}

export class LayoutController {
	#root!: Layout.Cell
	#options: LayoutControllerOptions
	#reset: () => void

	get root() {
		return this.#root
	}

	constructor(
			make_default_layout: () => Layout.Cell,
			options: LayoutControllerOptions,
		) {

		this.#options = options

		this.#reset = () => {
			this.#root = make_default_layout()
			for (const {node, path} of this.list<Layout.Leaf>("leaf"))
				this.#options.on_leaf_added(node, path)
			this.#options.on_change()
			this.#options.on_reset(this)
		}

		this.#reset()
	}

	find(path: number[]) {
		return find_layout_node(this.#root, path)
	}

	find_cell(cell_path: number[]) {
		return this.find(cell_path) as Layout.Cell
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

	list<N extends Layout.Node>(kind: N["kind"]) {
		const results: {node: N, path: number[]}[] = []

		function recurse(node: Layout.Node, path: number[]) {
			if (node.kind === kind)
				results.push({node: node as N, path})

			else if ("children" in node)
				node.children
					.forEach((node, index) => recurse(node, [...path, index]))
		}

		recurse(this.#root, [])
		return results
	}

	split_pane(pane_path: number[], vertical: boolean) {
		const {pane, pane_index, parent_cell} = this.find_pane(pane_path)
		const previous_size = pane.size

		if (parent_cell.vertical === vertical) {
			let new_size: undefined | number

			if (previous_size) {
				const half = previous_size / 2
				pane.size = half
				new_size = half
			}
			else {
				pane.size = (
					100
					- parent_cell.children
						.reduce((previous, current) => previous + (current.size ?? 0), 0)
				) / 2
				new_size = undefined
			}

			const new_pane: Layout.Pane = {
				kind: "pane",
				children: [],
				active_leaf_index: undefined,
				size: new_size,
			}

			parent_cell.children.splice(pane_index + 1, 0, new_pane)
		}
		else {
			pane.size = 50
			const new_cell: Layout.Cell = {
				kind: "cell",
				size: previous_size,
				vertical,
				children: [pane, {
					kind: "pane",
					size: undefined,
					children: [],
					active_leaf_index: undefined,
				}],
			}
			parent_cell.children.splice(pane_index, 1, new_cell)
		}

		this.#options.on_change()
	}

	delete_pane(pane_path: number[]) {
		const {pane, pane_index, parent_cell} = this.find_pane(pane_path)

		pane.children.forEach((leaf, index) => {
			const leaf_path = [...pane_path, index]
			this.#options.on_leaf_deleted(leaf, leaf_path)
		})

		parent_cell.children.splice(pane_index, 1)
		clear_size_of_last_child(parent_cell)

		if (this.list("pane").length === 0)
			this.#reset()

		else if (parent_cell.children.length === 0) {
			const parent_cell_index = pane_path.at(-2)!
			const path = pane_path.slice(0, -2)
			const grandparent_cell = this.find_cell(path)
			grandparent_cell.children.splice(parent_cell_index, 1)
			clear_size_of_last_child(grandparent_cell)
		}

		else if (parent_cell.children.length === 1) {
			const [only_child] = parent_cell.children
			if (only_child.kind === "cell") {
				parent_cell.children = only_child.children
				parent_cell.vertical = only_child.vertical
			}
		}

		this.#options.on_change()
	}

	delete_leaf(leaf_path: number[]) {
		const {leaf, leaf_index, parent_pane} = this.find_leaf(leaf_path)
		parent_pane.children.splice(leaf_index, 1)
		ensure_active_index_is_in_safe_range(parent_pane)
		this.#options.on_change()
		this.#options.on_leaf_deleted(leaf, leaf_path)
	}

	move_leaf(from: number[], to: number[]) {
		const {leaf, parent_pane: source_pane} = this.find_leaf(from)
		const {pane: destination_pane} = this.find_pane(to.slice(0, -1))
		const source_index = from.at(-1)!
		const destination_index = to.at(-1)!

		const delete_at_source = () => {
			source_pane.children.splice(source_index, 1)
			ensure_active_index_is_in_safe_range(source_pane)
		}

		const insert_at_destination = () => {
			destination_pane.children.splice(destination_index, 0, leaf)
			destination_pane.active_leaf_index = destination_index
		}

		if (source_pane === destination_pane) {
			if (source_index === destination_index || source_index === (destination_index - 1)) {
				console.log("same position, lol")
				return
			}
			if (source_index < destination_index) {
				insert_at_destination()
				delete_at_source()
				this.#options.on_change()
			}
			else {
				delete_at_source()
				insert_at_destination()
				this.#options.on_change()
			}
		}
		else {
			insert_at_destination()
			delete_at_source()
			this.#options.on_change()
		}
	}

	add_leaf(pane_path: number[], tab: Layout.LeafName) {
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

function clear_size_of_last_child(node: Layout.Cell) {
	const last = node.children.at(-1)
	if (last)
		last.size = undefined
}

function ensure_active_index_is_in_safe_range(pane: Layout.Pane) {
	return pane.active_leaf_index = pane.active_leaf_index === undefined
		? undefined
		: pane.active_leaf_index > (pane.children.length - 1)
			? undefined
			: pane.active_leaf_index
}

