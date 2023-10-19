
import { html } from "@benev/slate"

import {Layout} from "../../parts/layout.js"
import {tiles} from "../../../../tiles/tiles.js"
import {LayoutMeta} from "../utils/layout_meta.js"
import {quartz} from "../../../../context/context.js"
import {sprite_x} from "../../../../sprites/groups/feather/x.js"

const nil = () => {}

const inside_x_button = (event: MouseEvent) => {
	const target = event.target as Element
	const tab = event.currentTarget as HTMLElement
	const x = tab.querySelector(".x") as HTMLElement
	return event.target === x || x.contains(target)
}

export const OrdinaryTab = quartz(use => ({
		meta, pane, leaf, pane_path, leaf_index,
	}: {
		meta: LayoutMeta
		pane: Layout.Pane
		leaf: Layout.Leaf
		pane_path: number[]
		leaf_index: number
	}) => {

	const {icon, label} = tiles[leaf.tab]
	const leaf_path = [...pane_path, leaf_index]
	const active = pane.active_leaf_index === leaf_index
	const show_drag_indicator = meta.dragger.is_indicated(leaf_path)

	const close = () =>
		meta.layout.delete_leaf(leaf_path)

	const activate = () =>
		meta.layout.set_pane_active_leaf(pane_path, leaf_index)

	const click = (event: MouseEvent) => {
		if (!active) {
			activate()
			return
		}
		if (inside_x_button(event))
			close()
	}

	return html`
		<div class=tab data-tab-for-leaf="${leaf.id}">
			<div
				class=insert-indicator
				?data-drag=${show_drag_indicator}
			></div>

			<button
				data-ordinary
				title="${label}"
				?data-active=${active}
				@click=${click}

				draggable=true
				@dragstart=${meta.dragger.tab.start(leaf_path)}
				>

				<span class=icon>
					${icon}
				</span>

				<span class=x ?data-available=${active}>
					${active
						? sprite_x
						: undefined}
				</span>
			</button>
		</div>
	`
})

