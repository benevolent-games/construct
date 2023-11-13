
import {Id} from "../../../../tools/fresh_id.js"
import {OutlineGenius} from "../../outline_genius/controller.js"
import {OutlineActions} from "../../../domains/outline/actions.js"

export class SelectionClicks {
	#additive = true
	#lastSelected: Id | null = null

	constructor(
		private actions: OutlineActions,
		private outline: OutlineGenius,
	) {}

	click_item_in_viewport(id: Id | null) {
		const {outline, actions} = this
		if (id) {
			if (outline.isSelected(id))
				actions.deselect(id)
			else
				actions.select(id)
		}
		else
			actions.clear_selection()
	}

	click_item_in_outliner_panel(id: Id) {
		return (event: PointerEvent) => {

			if (event.ctrlKey)
				this.#toggle_select(id)

			else if (event.shiftKey)
				this.#range_select(id)

			else
				this.#select_only_this_one_thing(id)
		}
	}

	#toggle_select(id: Id) {
		const isRoot = this.outline.root.id === id
		if (isRoot)
			return

		this.#lastSelected = id

		if (this.outline.isSelected(id))
			this.actions.deselect(id)
		else
			this.actions.select(id)
	}

	#range_select(id: Id) {
		if (!this.#lastSelected) {
			this.#lastSelected = id
			return null
		}

		const lastIndex = this.outline.items
			.findIndex(i => i.id === this.#lastSelected)

		const currentIndex = this.outline.items
			.findIndex(i => i.id === id)

		if ((lastIndex === -1) || (currentIndex === -1))
			return null

		const smallest = Math.min(lastIndex, currentIndex)
		const biggest = Math.max(lastIndex, currentIndex)

		const range: Id[] = []

		this.outline.items.forEach((item, index) => {
			const between = (index >= smallest) && (index <= biggest)
			if (between)
				range.push(item.id)
		})

		if (this.#additive)
			this.actions.select(...range)
		else
			this.actions.clear_then_select(...range)
	}

	#select_only_this_one_thing(id: Id) {
		this.#lastSelected = id
		const already_selected = this.outline.isSelected(id)

		if (already_selected)
			this.actions.clear_then_deselect(id)
		else
			this.actions.clear_then_select(id)
	}
}

