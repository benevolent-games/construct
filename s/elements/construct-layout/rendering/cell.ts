
import {html} from "lit"

import {Layout} from "../parts/layout.js"
import {LayoutMeta} from "./utils/layout_meta.js"
import {alternator} from "../parts/alternator.js"
import {sizing_styles} from "../parts/sizing_styles.js"

export const render_cell = (meta: LayoutMeta) => (node: Layout.Cell, path: number[]) => html`
	<div
		class=cell
		?data-vertical=${node.vertical}
		style="${sizing_styles(node.size)}">

		${alternator(
			node.children,
			(child, index) => meta.render_layout(child, [...path, index]),
			(child, index) => html`
				<div
					class=resizer
					@pointerdown=${meta.resizer.start(node, child, index)}
				></div>
			`,
		)}
	</div>
`


