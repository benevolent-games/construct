
import {html} from "lit"

import {render_tabs} from "./tabs.js"
import {render_leaf} from "./leaf.js"
import {defined} from "../../../tools/defined.js"
import {LayoutMeta} from "./utils/layout_meta.js"
import {sizing_styles} from "../parts/sizing_styles.js"
import {render_adder_leaf} from "./utils/render_adder_leaf.js"
import {Layout} from "../../../context/controllers/layout/parts/types.js"

import {sprite_x} from "../../../sprites/groups/feather/x.js"
import {sprite_split_row} from "../../../sprites/groups/akar/panel-split-row.js"
import {sprite_split_column} from "../../../sprites/groups/akar/panel-split-column.js"

export const render_pane = (meta: LayoutMeta) => (
		pane: Layout.Pane,
	) => html`

	<div
		class=pane
		style="${sizing_styles(pane.size)}"
		?data-drag=${meta.dragger.is_pane_indicated(pane.id)}
		@dragenter=${meta.dragger.pane.enter(pane.id)}
		@dragleave=${meta.dragger.pane.leave()}
		@dragover=${meta.dragger.pane.over()}
		@dragend=${meta.dragger.pane.end()}
		@drop=${meta.dragger.pane.drop()}
		>

		<div class=taskbar>
			<div class=tabs>
				${render_tabs(meta, pane)}
			</div>

			<div class=actions>
				<button @click=${() => meta.layout.actions.split_pane(pane.id, false)}>
					${sprite_split_row}
				</button>

				<button @click=${() => meta.layout.actions.split_pane(pane.id, true)}>
					${sprite_split_column}
				</button>

				<button class=x @click=${() => meta.layout.actions.delete_pane(pane.id)}>
					${sprite_x}
				</button>
			</div>
		</div>

		${defined(pane.active_leaf_index, {
			yes: index => html`
				<div class="leaf panel">
					${render_leaf(meta)(pane.children[index])}
				</div>
			`,
			no: () => html`
				<div class="leaf adder">
					${render_adder_leaf(meta, pane)}
				</div>
			`,
		})}
	</div>
`

