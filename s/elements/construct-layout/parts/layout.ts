
import {tiles} from "../../../tiles/tiles.js"

export namespace Layout {
	export type Kind = "cell" | "pane" | "leaf"

	export type LeafName = keyof typeof tiles

	export interface Base {
		kind: Kind
	}

	export interface Leaf {
		id: number
		kind: "leaf"
		tab: LeafName
	}

	export interface Pane {
		kind: "pane"
		children: Leaf[]
		size: number | undefined
		active_leaf_index: number | undefined
	}

	export interface Cell {
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

