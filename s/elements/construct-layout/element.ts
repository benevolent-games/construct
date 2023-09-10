
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
		resizer: this.#resizer,
		on_pane_pointerdown: (path: number[]) => (event: PointerEvent) => {
			if (event.button === 1)
				this.#layout.split_pane(path)
		},
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

