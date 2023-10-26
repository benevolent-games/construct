
import {UseCarbon, html, render} from "@benev/slate"

import {leaf_slot} from "./leaf_slot.js"
import {panels} from "../../../panels/panels.js"
import {AppContext} from "../../../context/context.js"

export const use_layout = (use: UseCarbon<AppContext>) => use.init(() => {
	const machine = use.context.layout
	const {controller} = machine

	const disposers = [
		machine.on_change(() => use.rerender()),

		machine.on_leaf_added(leaf => {
			const leaf_id = leaf.id
			const div = document.createElement("div")
			div.setAttribute("data-id", leaf.id.toString())
			div.setAttribute("slot", leaf_slot(leaf.id))

			const {view} = panels[leaf.tab]
			const content = html`${view([{leaf_id}])}`

			render(content, div)
			use.element.appendChild(div)
		}),

		machine.on_leaf_deleted(leaf => {
			const div = use.element.querySelector<HTMLElement>(`[data-id="${leaf.id}"]`)
			if (div)
				div.remove()
		}),
	]

	return [
		controller,
		() => {
			for (const dispose of disposers)
				dispose()
		},
	]
})

// export function use_layout(
// 		,
// 	) {

// 	use.init(() => {
// 	})
// }

// export const make_layout_controller = (
// 		use: UseCarbon<AppContext>,
// 	) => (

// 	new LayoutController({
// 		on_change: () => use.rerender(),
// 		on_leaf_added: leaf => {
// 		},
// 		on_leaf_deleted: leaf => {
// 		},
// 		on_reset: layout => {
// 			const pane_path = [0]
// 			const leaf_path = layout.add_leaf(pane_path, "AboutPanel")
// 			layout.set_pane_active_leaf(pane_path, leaf_path.at(-1)!)
// 		},
// 	})
// )

