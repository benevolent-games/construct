
export namespace Layout {
	export type Kind = "cell" | "pane" | "leaf"

	export type Tab = (
		| "adder"
		| "viewport"
		| "outliner"
		| "inspector"
		| "catalog"
		| "settings"
	)

	export interface Base {
		kind: Kind
	}

	export interface Leaf {
		kind: "leaf"
		tab: Tab
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

