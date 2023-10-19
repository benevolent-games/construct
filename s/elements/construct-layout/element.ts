
import {html} from "@benev/slate"

import {styles} from "./styles.css.js"
import {Resizer} from "./resize/resizer.js"
import {carbon} from "../../context/context.js"
import {IdBooth} from "../../tools/id_booth.js"
import {TabDragger} from "./parts/tab_dragger.js"
import {make_layout_controller} from "./parts/make_layout_controller.js"
import {make_layout_renderer} from "./rendering/utils/make_layout_renderer.js"

export const ConstructLayout = carbon({styles}, use => {
	const resizer = use.prepare(() => new Resizer(() => use.rerender()))
	const layout = use.prepare(() => make_layout_controller(use))
	const render_layout = use.prepare(() => make_layout_renderer({
		layout,
		resizer,
		dragger: new TabDragger(layout),
	}))

	return html`
		<div
			class=layout
			@pointermove=${resizer.track_mouse_movement}
			@pointerup=${resizer.end}>

			${render_layout(layout.root, [])}
		</div>
	`
})

