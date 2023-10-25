
import {Layout} from "../../parts/layout.js"

export type ResizeOperation = {
	parent: Layout.Cell
	node: Layout.Cell | Layout.Pane
	next: undefined | {
		node: Layout.Cell | Layout.Pane
		initial_size: number | undefined
	}
	initial_size: number
	x: number
	y: number
	width: number
	height: number
}

