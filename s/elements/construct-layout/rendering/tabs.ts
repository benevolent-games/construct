
import {TemplateResult, html} from "lit"

import {Layout} from "../parts/layout.js"
import {tiles} from "../../../tiles/tiles.js"
import {LayoutMeta} from "./utils/layout_meta.js"
import {sprite_plus} from "../../../sprites/groups/feather/plus.js"

export const render_tabs = (meta: LayoutMeta, node: Layout.Pane, path: number[]) => html`
	<div class=tabs>

		${node.children.map((leaf, index) => tab({
			label: tiles[leaf.tab].icon,
			title: tiles[leaf.tab].label,
			active: node.active_leaf_index === index,
			click: () => meta.layout.set_pane_active_leaf(path, index),
		}))}

		${tab({
			label: sprite_plus,
			title: "add new tab",
			active: node.active_leaf_index === undefined,
			click: () => meta.layout.set_pane_active_leaf(path, undefined)
		})}
	</div>
`

export function tab({label, title, active, click}: {
		label: string | TemplateResult
		title: string
		active: boolean
		click: () => void
	}) {

	return html`
		<div
			class=tab
			title="${title}"
			?data-active=${active}
			@click=${click}>
			${label}
		</div>
	`
}

