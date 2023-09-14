
import {html} from "lit"
import {ShaleView} from "@benev/slate"

import {tab_styles} from "./tab_styles.js"
import {Layout} from "../../parts/layout.js"
import {tiles} from "../../../../tiles/tiles.js"
import {LayoutMeta} from "../utils/layout_meta.js"
import {view} from "../../../../framework/frontend.js"
import {sprite_x} from "../../../../sprites/groups/feather/x.js"

export const OrdinaryTab = view(_context => class extends ShaleView {
	static name = "ordinary-tab"
	static styles = tab_styles

	#inside_x_button(event: MouseEvent) {
		const target = event.target as Element
		const tab = event.currentTarget as HTMLElement
		const x = tab.querySelector(".x") as HTMLElement
		return event.target === x || x.contains(target)
	}

	render({meta, pane, leaf, pane_path, leaf_index}: {
			meta: LayoutMeta
			pane: Layout.Pane
			leaf: Layout.Leaf
			pane_path: number[]
			leaf_index: number
		}) {

		const {icon, label} = tiles[leaf.tab]
		const leaf_path = [...pane_path, leaf_index]
		const active = pane.active_leaf_index === leaf_index

		const close = () =>
			meta.layout.delete_leaf(leaf_path)

		const activate = () =>
			meta.layout.set_pane_active_leaf(pane_path, leaf_index)

		const click = (event: MouseEvent) => {
			if (!active) {
				activate()
				return
			}
			if (this.#inside_x_button(event))
				close()
		}

		return html`
			<div class=insert-indicator></div>

			<button
				data-ordinary
				title="${label}"
				?data-active=${active}
				@click=${click}
				draggable>

				<span class=icon>
					${icon}
				</span>

				<span class=x ?data-available=${active}>
					${active
						? sprite_x
						: undefined}
				</span>
			</button>
		`
	}
})

