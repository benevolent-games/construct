
import {panels} from "../../../panels/panels.js"

export namespace Layout {
	export type File = {
		version: 0,
		id_count: number
		root: Layout.Cell
	}

	export type Kind = "cell" | "pane" | "leaf"
	export type LeafName = keyof typeof panels

	export interface Base {
		kind: Kind
	}

	export interface Leaf {
		id: number
		kind: "leaf"
		tab: LeafName
	}

	export interface Pane {
		id: number
		kind: "pane"
		children: Leaf[]
		size: number | undefined
		active_leaf_index: number | undefined
	}

	export interface Cell {
		id: number
		kind: "cell"
		children: (Cell | Pane)[]
		vertical: boolean
		size: number | undefined
	}

	export type Node = (
		| Leaf
		| Pane
		| Cell
	)
}

