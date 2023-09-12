
import {TemplateResult, html} from "lit"

import {Layout} from "../parts/layout.js"
import {tiles} from "../../../tiles/tiles.js"
import {LayoutMeta} from "./utils/layout_meta.js"
import {sprite_x} from "../../../sprites/groups/feather/x.js"
import {sprite_plus} from "../../../sprites/groups/feather/plus.js"

export const render_tabs = (meta: LayoutMeta, node: Layout.Pane, pane_path: number[]) => html`

	${node.children.map((leaf, index) => {
		const {icon, label} = tiles[leaf.tab]
		return tab({
			content: icon,
			title: label,
			removable: true,
			active: node.active_leaf_index === index,
			activate: () => meta.layout.set_pane_active_leaf(pane_path, index),
			close: () => meta.layout.delete_leaf([...pane_path, index]),
		})}
	)}

	${tab({
		content: sprite_plus,
		title: "add new tab",
		removable: false,
		active: node.active_leaf_index === undefined,
		activate: () => meta.layout.set_pane_active_leaf(pane_path, undefined),
		close: () => {},
	})}
`

function tab({content, title, removable, active, activate, close}: {
		content: string | TemplateResult
		title: string
		removable: boolean
		active: boolean
		activate: () => void
		close: () => void
	}) {

	const click = (event: MouseEvent) => {
		if (removable && active) {
			const target = event.target as Element
			const tab = event.currentTarget as HTMLElement
			const x = tab.querySelector(".x") as HTMLElement
			const click_is_inside_x = event.target === x || x.contains(target)

			if (click_is_inside_x)
				close()
		}
		else
			activate()
	}

	return html`
		<button
			title="${title}"
			?data-active=${active}
			?data-permanent=${!removable}
			@click=${click}>

			<span class=icon>
				${content}
			</span>

			${removable ? html`
				<span
					class=x
					?data-available=${active}>
					${active
						? sprite_x
						: undefined}
				</span>
			` : undefined}
		</button>
	`
}

