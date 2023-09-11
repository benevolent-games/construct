
import {html, render} from "lit"
import {GoldElement} from "@benev/slate"

import {styles} from "./styles.css.js"
import {Layout} from "./parts/layout.js"
import {Resizer} from "./resize/resizer.js"
import {IdBooth} from "../../tools/id_booth.js"
import {leaf_slot_name} from "./parts/leaf_slot_name.js"
import {default_layout} from "./parts/default_layout.js"
import {component, views} from "../../framework/frontend.js"
import {LayoutController} from "./parts/layout_controller.js"
import {setup_layout_renderer} from "./rendering/utils/setup_layout_renderer.js"

import {AboutLeaf} from "../../leaves/about.js"
import {UnknownLeaf} from "../../leaves/unknown.js"

export const ConstructLayout = component(context => class extends GoldElement {
	static styles = styles

	#id_booth = new IdBooth()
	#resizer = new Resizer(() => this.requestUpdate())

	#leaves = views(context, {
		about: AboutLeaf,
		adder: UnknownLeaf,
		catalog: UnknownLeaf,
		outliner: UnknownLeaf,
		settings: UnknownLeaf,
		viewport: UnknownLeaf,
		inspector: UnknownLeaf,
	} satisfies {[P in Layout.Tab]: any})

	#layout = new LayoutController(default_layout(), {
		id_booth: this.#id_booth,
		on_change: () => this.requestUpdate(),
		on_leaf_added: (leaf, path) => {
			const div = document.createElement("div")
			div.setAttribute("data-id", leaf.id.toString())
			div.setAttribute("slot", leaf_slot_name(path))
			const content = html`${
				this.#leaves[leaf.tab]({props: []})
			}`
			render(content, div)
			this.appendChild(div)
		},
		on_leaf_deleted: leaf => {
			const div = this.querySelector<HTMLElement>(`[data-id="${leaf.id}"]`)
			if (div)
				div.remove()
		},
	})

	#render_layout = setup_layout_renderer({
		layout: this.#layout,
		resizer: this.#resizer,
	})

	constructor() {
		super()
		const pane_path = [0]
		const leaf_path = this.#layout.add_leaf(pane_path, "about")
		this.#layout.set_pane_active_leaf(pane_path, leaf_path.at(-1)!)
	}

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

