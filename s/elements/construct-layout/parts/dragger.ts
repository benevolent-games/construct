
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

export class DragUnit {
	#count = 0
	#on_change: (drag: boolean) => void

	constructor(on_change: (drag: boolean) => void) {
		this.#on_change = on_change
	}

	get drag() {
		return this.#count > 0
	}

	increment() {
		this.#count++
		this.#on_change(this.drag)
	}

	decrement() {
		this.#count--
		this.#on_change(this.drag)
	}

	reset() {
		this.#count = 0
		this.#on_change(this.drag)
	}
}

export class Dragger {
	#layout: LayoutController
	#units = new Set<DragUnit>()
	#operation: DragOperation | undefined

	register_unit(unit: DragUnit) {
		this.#units.add(unit)
	}

	#reset_all_units() {
		for (const unit of this.#units)
			unit.reset()
	}

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
			this.#reset_all_units()
		},

		dragend: () => {
			this.#operation = undefined
			this.#reset_all_units()
		},
	})

	destination_handlers = (
			unit: DragUnit,
			proposed_insertion_path: number[],
		): DragDestinationHandlers => ({

		dragenter: () => {
			if (!unit.drag && this.#operation)
				this.#operation.proposed_insertion_path = proposed_insertion_path
			unit.increment()
		},

		dragleave: () => {
			unit.decrement()
			if (!unit.drag && this.#operation)
				this.#operation.proposed_insertion_path = undefined
		},

		dragover: event => {
			event.preventDefault()
		},

		drop: () => {
			this.#reset_all_units()

			if (!(this.#operation?.source_leaf_path && this.#operation.proposed_insertion_path))
				return

			this.#layout.move_leaf(
				this.#operation.source_leaf_path,
				this.#operation.proposed_insertion_path,
			)
		},
	})
}

