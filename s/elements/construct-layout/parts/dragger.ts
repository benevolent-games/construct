
import {LayoutController} from "./layout_controller.js"

export type DragOperation = {
	source_leaf_path: number[]
	proposed_insertion_path: undefined | number[]
}

export type DragSourceHandlers = {
	dragstart: (event: DragEvent) => void
	dragend: (event: DragEvent) => void
}

export type DragDestinationHandlers = {
	dragenter: (event: DragEvent) => void
	dragleave: (event: DragEvent) => void
	dragover: (event: DragEvent) => void
	drop: (event: DragEvent) => void
}

export class Dragger {
	#operation: DragOperation | undefined
	#layout: LayoutController

	constructor(layout: LayoutController) {
		this.#layout = layout
	}

	get operation() {
		return this.#operation
	}

	source_handlers = (
			source_leaf_path: number[],
		): DragSourceHandlers => ({

		dragstart: () => {
			this.#operation = {
				source_leaf_path,
				proposed_insertion_path: undefined,
			}
		},

		dragend: () => {
			this.#operation = undefined
		},
	})

	destination_handlers = (
			proposed_insertion_path: number[],
		): DragDestinationHandlers => ({

		dragenter: event => {
			console.log("dragenter", event.currentTarget, event.target)
			if (is_relevant(event)) {
				if (this.#operation)
					this.#operation.proposed_insertion_path = proposed_insertion_path
			}
		},

		dragleave: event => {
			console.log("dragleave", event.currentTarget, event.target)
			if (is_relevant(event)) {
				if (this.#operation)
					this.#operation.proposed_insertion_path = undefined
			}
		},

		dragover: event => {
			event.preventDefault()
		},

		drop: () => {
			console.log("DROP", this.#operation)
		},
	})
}

// utils

function is_relevant(event: DragEvent) {
	const target = event.target as HTMLElement
	const currentTarget = event.currentTarget as HTMLElement

	return (target && currentTarget)
		?	(currentTarget === target) && !currentTarget.contains(target)
		: false
}

