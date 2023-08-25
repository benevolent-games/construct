
export namespace Layout {
	export type Kind = "cell" | "pane" | "plate"

	export interface Base {
		kind: Kind
	}

	export interface Plate {
		kind: "plate"
	}

	export interface Pane {
		kind: "pane"
		children: Plate[]
		size: number | undefined
	}

	export interface Cell {
		kind: "cell"
		children: (Cell | Pane)[]
		vertical: boolean
	}

	export type Node = (
		| Plate
		| Pane
		| Cell
	)
}

