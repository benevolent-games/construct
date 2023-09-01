
import {Layout} from "../parts/layout.js"
import {ResizeOperation} from "./utils/operation.js"
import {calculate_new_size_indicated_by_drag} from "./utils/calculate_new_size_indicated_by_drag.js"
import {apply_relevant_sizing_to_next_sibling} from "./utils/apply_relevant_sizing_to_next_sibling.js"
import {calculate_amount_of_container_overflow} from "./utils/calculate_amount_of_container_overflow.js"

export class Resizer {
	#rerender: () => void
	#operation: ResizeOperation | undefined

	constructor(rerender: () => void) {
		this.#rerender = rerender
	}

	start = (
			node: Layout.Cell,
			child: Layout.Cell | Layout.Pane,
			index: number,
		) => (event: MouseEvent) => {

		const target = event.target as HTMLElement
		const rect = target.parentElement!.getBoundingClientRect()
		const next = node.children.at(index + 1)

		this.#operation = {
			node: child,
			parent: node,
			initial_size: child.size ?? 50,
			next: next
				? {node: next, initial_size: next.size}
				: undefined,
			x: event.clientX,
			y: event.clientY,
			width: rect.width,
			height: rect.height,
		}
	}

	track_mouse_movement = (event: MouseEvent) => {
		const resize = this.#operation

		if (resize) {
			const proposed_size = calculate_new_size_indicated_by_drag(
				resize,
				event,
			)

			const leakage = calculate_amount_of_container_overflow(
				resize,
				proposed_size,
			)

			const new_size = proposed_size - leakage
			resize.node.size = new_size
			apply_relevant_sizing_to_next_sibling(resize, new_size)

			this.#rerender()
		}
	}

	end = () => {
		this.#operation = undefined
	}
}

