
import {html, render} from "lit"
import {GoldElement} from "@benev/slate"

import {styles} from "./styles.css.js"
import {tiles} from "../../tiles/tiles.js"
import {Dragger} from "./parts/dragger.js"
import {Resizer} from "./resize/resizer.js"
import {leaf_slot} from "./parts/leaf_slot.js"
import {IdBooth} from "../../tools/id_booth.js"
import {Context} from "../../context/context.js"
import {default_layout} from "./parts/default_layout.js"
import {LayoutController} from "./parts/layout_controller.js"

import {component, tile, views} from "../../framework/frontend.js"
import {setup_layout_renderer} from "./rendering/utils/setup_layout_renderer.js"

import {AdderTab} from "./rendering/tabs/adder_tab.js"
import {OrdinaryTab} from "./rendering/tabs/ordinary_tab.js"

export const setup_tab_views = (context: Context) => views(
	context,
	{
		OrdinaryTab,
		AdderTab,
	}
)

export type TabViews = ReturnType<typeof setup_tab_views>

export const ConstructLayout = component(context => class extends GoldElement {
	static styles = styles

	#id_booth = new IdBooth()
	#resizer = new Resizer(() => this.requestUpdate())
	#tile_views = views(context, tile.views(tiles))

	#layout = new LayoutController(default_layout, {
		id_booth: this.#id_booth,
		on_change: () => this.requestUpdate(),
		on_leaf_added: leaf => {
			const div = document.createElement("div")
			div.setAttribute("data-id", leaf.id.toString())
			div.setAttribute("slot", leaf_slot(leaf.id))
			const content = html`${this.#tile_views[leaf.tab]({props: []})}`
			render(content, div)
			this.appendChild(div)
		},
		on_leaf_deleted: leaf => {
			const div = this.querySelector<HTMLElement>(`[data-id="${leaf.id}"]`)
			if (div)
				div.remove()
		},
		on_reset: layout => {
			const pane_path = [0]
			const leaf_path = layout.add_leaf(pane_path, "AboutTile")
			layout.set_pane_active_leaf(pane_path, leaf_path.at(-1)!)
		},
	})

	#render_layout = setup_layout_renderer({
		layout: this.#layout,
		resizer: this.#resizer,
		dragger: new Dragger(this.#layout),
		tab_views: setup_tab_views(context),
	})

	render() {
		return html`
			<div
				class=layout
				@pointermove=${this.#resizer.track_mouse_movement}
				@pointerup=${this.#resizer.end}>

				${this.#render_layout(this.#layout.root, [])}
			</div>
		`
	}
})

