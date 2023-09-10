
import {TemplateResult, html} from "lit"

import {Layout} from "../parts/layout.js"
import {LayoutMeta} from "./utils/layout_meta.js"
import {sprite_plus} from "../../../sprites/groups/feather/plus.js"

export const render_tabs = (meta: LayoutMeta, node: Layout.Pane, path: number[]) => html`
	<div class=tabs>

		${node.children.map((leaf, index) => tab(
			leaf.tab,
			node.active_leaf_index === index,
			() => meta.layout.set_pane_active_leaf(path, index),
		))}

		${tab(
			sprite_plus,
			node.active_leaf_index === undefined,
			() => meta.layout.set_pane_active_leaf(path, undefined)
		)}
	</div>
`

export const render_tab = (
		leaf: Layout.Leaf,
		active: boolean,
		_path: number[],
	) => html`

	<div class=tab ?data-active=${active}>
		${leaf.tab}
	</div>
`

export function tab(
		label: string | TemplateResult,
		active: boolean,
		click: () => void,
	) {

	return html`
		<div
			class=tab
			?data-active=${active}
			@click=${click}>
			${label}
		</div>
	`
}

