
import {html} from "lit"
import {ShaleView} from "@benev/slate"

import {tab_styles} from "./tab_styles.js"
import {Layout} from "../../parts/layout.js"
import {tiles} from "../../../../tiles/tiles.js"
import {LayoutMeta} from "../utils/layout_meta.js"
import {view} from "../../../../framework/frontend.js"
import {sprite_x} from "../../../../sprites/groups/feather/x.js"

export const OrdinaryTab = view(_context => class extends ShaleView {
	static name = "tab ordinary"
	static styles = tab_styles

	#click = ({active, close, activate}: {
			active: boolean
			close: () => void
			activate: () => void
		}) => (event: MouseEvent) => {

		if (active) {
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

		const click = this.#click({
			active,
			activate: () =>
				meta.layout.set_pane_active_leaf(pane_path, leaf_index),
			close: () =>
				meta.layout.delete_leaf(leaf_path),
		})

		return html`
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

