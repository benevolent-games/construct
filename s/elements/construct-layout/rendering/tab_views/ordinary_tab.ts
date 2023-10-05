
import {html} from "lit"
import {ShaleView} from "@benev/slate"

import {tab_styles} from "./tab_styles.js"
import {Layout} from "../../parts/layout.js"
import {DragUnit} from "../../parts/dragger.js"
import {tiles} from "../../../../tiles/tiles.js"
import {LayoutMeta} from "../utils/layout_meta.js"
import {view} from "../../../../framework/frontend.js"
import {sprite_x} from "../../../../sprites/groups/feather/x.js"

export const OrdinaryTab = view(context => class extends ShaleView {
	static name = "ordinary-tab"
	static styles = tab_styles

	#inside_x_button(event: MouseEvent) {
		const target = event.target as Element
		const tab = event.currentTarget as HTMLElement
		const x = tab.querySelector(".x") as HTMLElement
		return event.target === x || x.contains(target)
	}

	#state = context.flat.state({
		drag: false,
	})

	#drag_unit = new DragUnit(drag => {
		this.#state.drag = drag
	})

	render({meta, pane, leaf, pane_path, leaf_index}: {
			meta: LayoutMeta
			pane: Layout.Pane
			leaf: Layout.Leaf
			pane_path: number[]
			leaf_index: number
		}) {

		const unit = this.#drag_unit
		meta.dragger.register_unit(unit)

		const {icon, label} = tiles[leaf.tab]
		const leaf_path = [...pane_path, leaf_index]
		const active = pane.active_leaf_index === leaf_index

		const close = () =>
			meta.layout.delete_leaf(leaf_path)

		const activate = () =>
			meta.layout.set_pane_active_leaf(pane_path, leaf_index)

		const drag = {
			source: meta.dragger.source_handlers(leaf_path),
			destination: meta.dragger.destination_handlers(unit, leaf_path),
		}

		const click = (event: MouseEvent) => {
			if (!active) {
				activate()
				return
			}
			if (this.#inside_x_button(event))
				close()
		}

		const nil = () => {}

		return html`
			<div
				class=insert-indicator
				?data-drag=${this.#state.drag}
			></div>

			<button
				data-ordinary
				title="${label}"
				?data-active=${active}
				@click=${click}

				draggable=true
				@dragstart=${drag.source.dragstart}
				@dragend=${drag.source.dragend}
				@dragenter=${nil}
				@dragover=${nil}
				@dragleave=${nil}
				@drop=${nil}>

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

