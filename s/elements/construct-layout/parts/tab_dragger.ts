
import {Layout} from "./layout.js"
import {context} from "../../../context/context.js"
import {LayoutController} from "./layout_controller.js"

export type TabDragOperation = {
	source_leaf_path: number[]
	proposed_insertion_path: undefined | number[]
}

function is_within(target: EventTarget | null, selector: string): HTMLElement | undefined {
	let node = target as HTMLElement | null

	while (node) {
		if (node.matches && node.matches(selector))
			return node

		node = node.parentElement
	}

	return undefined
}

function paths_are_the_same(a: number[], b: number[]) {
	if (a.length === b.length) {
		for (let i = 0; i < a.length; i++) {
			if (a[i] !== b[i])
				return false
		}
		return true
	}
	return false
}

export class TabDragger {
	#operation = context.tower.signal<TabDragOperation | undefined>(undefined)
	#layout: LayoutController

	constructor(layout: LayoutController) {
		this.#layout = layout
	}

	is_indicated(path: number[]) {
		const operation = this.#operation.value
		return (operation && operation.proposed_insertion_path)
			? paths_are_the_same(path, operation.proposed_insertion_path)
			: false
	}

	tab = {
		start: (source_leaf_path: number[]) =>  (_: DragEvent) => {
			this.#operation.value = {
				source_leaf_path,
				proposed_insertion_path: undefined,
			}
		},
	}

	pane = {
		enter: (pane: Layout.Pane, pane_path: number[]) => (event: DragEvent) => {
			const operation = this.#operation.value
			if (operation) {
				const within_tab = is_within(event.target, `[data-tab-for-leaf]`)
				this.#operation.value = {
					source_leaf_path: operation.source_leaf_path,
					proposed_insertion_path: within_tab
						? this.#layout.find_leaf_by_id(
							parseInt(within_tab.getAttribute("data-tab-for-leaf")!)
						).path
						: [...pane_path, pane.children.length],
				}
			}
		},
		leave: () => (event: DragEvent) => {
			const operation = this.#operation.value
			if (operation && event.relatedTarget === null)
				this.#operation.value = {
					source_leaf_path: operation.source_leaf_path,
					proposed_insertion_path: undefined,
				}
		},
		over: () => (event: DragEvent) => {
			event.preventDefault()
		},
		end: () => (_: DragEvent) => {
			this.#operation.value = undefined
		},
		drop: () => (_: DragEvent) => {
			const operation = this.#operation.value
			if (operation && operation.proposed_insertion_path) {
				this.#layout.move_leaf(
					operation.source_leaf_path,
					operation.proposed_insertion_path,
				)
			}
			this.#operation.value = undefined
		},
	}
}

