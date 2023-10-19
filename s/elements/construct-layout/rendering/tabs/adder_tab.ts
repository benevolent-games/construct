
import {html} from "@benev/slate"

import {Layout} from "../../parts/layout.js"
import {LayoutMeta} from "../utils/layout_meta.js"
import {quartz} from "../../../../context/context.js"
import {sprite_plus} from "../../../../sprites/groups/feather/plus.js"

const nil = () => {}

export const AdderTab = quartz(use => ({meta, pane, pane_path}: {
		meta: LayoutMeta
		pane: Layout.Pane
		pane_path: number[]
	}) => {

	const drag = use.signal(false)
	const active = pane.active_leaf_index === undefined
	const activate = () => meta
		.layout
		.set_pane_active_leaf(pane_path, undefined)

	return html`
		<div class=tab>
			<div
				class=insert-indicator
				?data-drag=${drag}
			></div>

			<button
				data-adder
				title="add new tab"
				?data-active="${active}"
				@click=${activate}
				@dragenter=${nil}
				@dragover=${nil}
				@dragleave=${nil}
				@drop=${nil}>

				<span class=icon>
					${sprite_plus}
				</span>

			</button>
		</div>
	`
})

