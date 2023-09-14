
import {html} from "lit"
import {ShaleView} from "@benev/slate"

import {tab_styles} from "./tab_styles.js"
import {Layout} from "../../parts/layout.js"
import {LayoutMeta} from "../utils/layout_meta.js"
import {view} from "../../../../framework/frontend.js"
import {sprite_plus} from "../../../../sprites/groups/feather/plus.js"

export const AdderTab = view(_context => class extends ShaleView {
	static name = "adder-tab"
	static styles = tab_styles

	render({meta, pane, pane_path}: {
			meta: LayoutMeta
			pane: Layout.Pane
			pane_path: number[]
		}) {

		const active = pane.active_leaf_index === undefined

		const activate = () =>
			meta.layout.set_pane_active_leaf(pane_path, undefined)

		return html`
			<div class=insert-indicator></div>

			<button
				data-adder
				title="add new tab"
				?data-active="${active}"
				@click=${activate}
				draggable>

				<span class=icon>
					${sprite_plus}
				</span>

			</button>
		`
	}
})

