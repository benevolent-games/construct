
import {UseCarbon, html, render} from "@benev/slate"

import {leaf_slot} from "./leaf_slot.js"
import {tiles} from "../../../tiles/tiles.js"
import {default_layout} from "./default_layout.js"
import {AppContext} from "../../../context/context.js"
import {LayoutController} from "./layout_controller.js"

export const make_layout_controller = (
		use: UseCarbon<AppContext>,
	) => (

	new LayoutController(default_layout, {
		on_change: () => use.rerender(),
		on_leaf_added: leaf => {
			const div = document.createElement("div")
			div.setAttribute("data-id", leaf.id.toString())
			div.setAttribute("slot", leaf_slot(leaf.id))

			const {view} = tiles[leaf.tab]
			const content = html`${view([])}`

			render(content, div)
			use.element.appendChild(div)
		},
		on_leaf_deleted: leaf => {
			const div = use.element.querySelector<HTMLElement>(`[data-id="${leaf.id}"]`)
			if (div)
				div.remove()
		},
		on_reset: layout => {
			const pane_path = [0]
			const leaf_path = layout.add_leaf(pane_path, "AboutTile")
			layout.set_pane_active_leaf(pane_path, leaf_path.at(-1)!)
		},
	})
)

