
import {ResizeOperation} from "./operation.js"
import {cap_percent} from "../../../../tools/number_functions.js"

export function apply_relevant_sizing_to_next_sibling(
		resize: ResizeOperation,
		new_size_of_current_cell: number,
	) {

	if (
			resize.next &&
			resize.next.initial_size !== undefined &&
			resize.next.node.size !== undefined
		) {

		resize.next.node.size = cap_percent(
			resize.next.initial_size + (resize.initial_size - new_size_of_current_cell)
		)
	}
}

