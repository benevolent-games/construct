
import {html} from "lit"
import {QuickElement} from "@benev/frog"

import {styles} from "./styles.css.js"
import {component} from "../frontend.js"
import {Resizer} from "./resize/resizer.js"
import {default_layout} from "./parts/default_layout.js"
import {LayoutController} from "./parts/layout_controller.js"
import {setup_layout_renderer} from "./rendering/utils/setup_layout_renderer.js"

export const ConstructLayout = component(_ => class extends QuickElement {
	static styles = styles

	#layout = new LayoutController(default_layout(), () => this.requestUpdate())
	#resizer = new Resizer(() => this.requestUpdate())

	#render_layout = setup_layout_renderer({
		layout: this.#layout,
		resizer: this.#resizer,
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

