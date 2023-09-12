
import {html} from "lit"

import {render_tabs} from "./tabs.js"
import {render_leaf} from "./leaf.js"
import {Layout} from "../parts/layout.js"
import {defined} from "../../../tools/defined.js"
import {LayoutMeta} from "./utils/layout_meta.js"
import {sizing_styles} from "../parts/sizing_styles.js"
import {render_adder_leaf} from "./utils/render_adder_leaf.js"

import {sprite_x} from "../../../sprites/groups/feather/x.js"
import {sprite_split_row} from "../../../sprites/groups/akar/panel-split-row.js"
import {sprite_split_column} from "../../../sprites/groups/akar/panel-split-column.js"

export const render_pane = (meta: LayoutMeta) => (
		node: Layout.Pane,
		pane_path: number[],
	) => html`

	<div
		class=pane
		style="${sizing_styles(node.size)}">

		<div class=taskbar>
			<div class=tabs>
				${render_tabs(meta, node, pane_path)}
			</div>

			<div class=actions>
				<button @click=${() => meta.layout.split_pane(pane_path, false)}>
					${sprite_split_row}
				</button>

				<button @click=${() => meta.layout.split_pane(pane_path, true)}>
					${sprite_split_column}
				</button>

				<button class=x @click=${() => meta.layout.delete_pane(pane_path)}>
					${sprite_x}
				</button>
			</div>
		</div>

		<div class=leaf>
			${defined(node.active_leaf_index, {
				yes: index => render_leaf(meta)(node.children[index], [...pane_path, index]),
				no: () => render_adder_leaf(meta, pane_path),
			})}
		</div>
	</div>
`

