
import {html} from "@benev/slate"

import {Layout} from "../../parts/layout.js"
import {LayoutMeta} from "../utils/layout_meta.js"
import {quartz} from "../../../../context/context.js"
import {sprite_plus} from "../../../../sprites/groups/feather/plus.js"

export const AdderTab = quartz(_ => ({meta, pane, pane_path}: {
		meta: LayoutMeta
		pane: Layout.Pane
		pane_path: number[]
	}) => {

	const active = pane.active_leaf_index === undefined
	const activate = () => meta
		.layout
		.set_pane_active_leaf(pane_path, undefined)
	const leaf_path = [...pane_path, pane.children.length]
	const show_drag_indicator = meta.dragger.is_indicated(leaf_path)

	return html`
		<div class=tab>
			<div
				class=insert-indicator
				?data-drag=${show_drag_indicator}
			></div>

			<button
				data-adder
				title="add new tab"
				?data-active="${active}"
				@click=${activate}
				>

				<span class=icon>
					${sprite_plus}
				</span>

			</button>
		</div>
	`
})

