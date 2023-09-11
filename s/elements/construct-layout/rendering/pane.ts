
import {html} from "lit"

import {render_tabs} from "./tabs.js"
import {render_leaf} from "./leaf.js"
import {Layout} from "../parts/layout.js"
import {defined} from "../../../tools/defined.js"
import {LayoutMeta} from "./utils/layout_meta.js"
import {middle_click} from "./utils/middle_click.js"
import {sizing_styles} from "../parts/sizing_styles.js"
import {render_adder_leaf} from "./utils/render_adder_leaf.js"

export const render_pane = (meta: LayoutMeta) => (
		node: Layout.Pane,
		pane_path: number[],
	) => html`

	<div
		class=pane
		style="${sizing_styles(node.size)}"
		@pointerdown=${middle_click(() => meta.layout.split_pane(pane_path))}>

		${render_tabs(meta, node, pane_path)}

		<div class=leaf>
			${defined(node.active_leaf_index, {
				yes: index => render_leaf(meta)(node.children[index], [...pane_path, index]),
				no: () => render_adder_leaf(meta, pane_path),
			})}
		</div>
	</div>
`

