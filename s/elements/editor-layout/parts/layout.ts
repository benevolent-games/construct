
export namespace Layout {
	export type Kind = "cell" | "pane" | "leaf"

	export interface Base {
		kind: Kind
	}

	export interface Leaf {
		kind: "leaf"
	}

	export interface Pane {
		kind: "pane"
		children: Leaf[]
		size: number | undefined
	}

	export interface Cell {
		kind: "cell"
		children: (Cell | Pane)[]
		vertical: boolean
	}

	export type Node = (
		| Leaf
		| Pane
		| Cell
	)
}

