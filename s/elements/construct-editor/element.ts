
import {html} from "@benev/slate"

import {styles} from "./styles.css.js"
import {Resizer} from "./resize/resizer.js"
import {TabDragger} from "./parts/tab_dragger.js"
import {leaf_management} from "./parts/leaf_management.js"
import {miniSlate as slate} from "../../context/mini_slate.js"
import {make_layout_renderer} from "./rendering/utils/make_layout_renderer.js"

export const ConstructEditor = slate.carbon({styles}, use => {
	const {layout, panels, drops} = use.context
	const dropzone = drops.editor

	use.watch(() => layout.root)

	const leaves = use.prepare(leaf_management({
		panels,
		element: use.element,
		seeker: layout.seeker,
	}))

	leaves.add_new_leaves()
	leaves.delete_old_leaves()

	const resizer = use.prepare(() => new Resizer(layout))

	const render_layout = use.prepare(() => make_layout_renderer({
		layout,
		resizer,
		panels: use.context.panels,
		dragger: new TabDragger(use.context, layout),
	}))

	return html`
		<div
			class=layout
			@contextmenu=${(e: Event) => e.preventDefault()}
			@pointermove=${resizer.track_mouse_movement}
			@pointerup=${resizer.end}
			?data-dropzone-indicator=${dropzone.indicator}
			@dragover=${dropzone.dragover}
			@dragleave=${dropzone.dragleave}
			@drop=${dropzone.drop}
			>

			${render_layout(layout.root)}
		</div>
	`
})

