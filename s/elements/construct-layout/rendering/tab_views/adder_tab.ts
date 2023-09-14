
import {html} from "lit"
import {ShaleView} from "@benev/slate"

import {tab_styles} from "./tab_styles.js"
import {Layout} from "../../parts/layout.js"
import {DragUnit} from "../../parts/dragger.js"
import {LayoutMeta} from "../utils/layout_meta.js"
import {view} from "../../../../framework/frontend.js"
import {sprite_plus} from "../../../../sprites/groups/feather/plus.js"

export const AdderTab = view(context => class extends ShaleView {
	static name = "adder-tab"
	static styles = tab_styles

	#state = context.flat.state({
		drag: false,
	})

	#drag_unit = new DragUnit(drag => {
		this.#state.drag = drag
	})

	render({meta, pane, pane_path}: {
			meta: LayoutMeta
			pane: Layout.Pane
			pane_path: number[]
		}) {

		const unit = this.#drag_unit
		meta.dragger.register_unit(unit)
		const drag_destination = meta.dragger
			.destination_handlers(unit, [...pane_path, pane.children.length])

		const active = pane.active_leaf_index === undefined

		const activate = () =>
			meta.layout.set_pane_active_leaf(pane_path, undefined)

		return html`
			<div
				class=insert-indicator
				?data-drag=${this.#state.drag}
			></div>

			<button
				data-adder
				title="add new tab"
				?data-active="${active}"
				@click=${activate}
				@dragenter=${drag_destination.dragenter}
				@dragover=${drag_destination.dragover}
				@dragleave=${drag_destination.dragleave}
				@drop=${drag_destination.drop}>

				<span class=icon>
					${sprite_plus}
				</span>

			</button>
		`
	}
})

