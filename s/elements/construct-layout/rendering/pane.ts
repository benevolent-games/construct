
import {html} from "lit"

import {render_tabs} from "./tabs.js"
import {render_leaf} from "./leaf.js"
import {Layout} from "../parts/layout.js"
import {LayoutMeta} from "./utils/layout_meta.js"
import {sizing_styles} from "../parts/sizing_styles.js"

export const render_pane = (meta: LayoutMeta) => (node: Layout.Pane, path: number[]) => html`
	<div
		class=pane
		style="${sizing_styles(node.size)}"
		@pointerdown="${meta.on_pane_pointerdown(path)}">

		${render_tabs(node.children, path)}

		<div class=leaves>
			${node.children.map(
				(leaf, index) => render_leaf(meta)(leaf, [...path, index])
			)}
		</div>
	</div>
`

