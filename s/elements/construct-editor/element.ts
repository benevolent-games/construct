
import {html} from "@benev/slate"

import {styles} from "./styles.css.js"
import {Resizer} from "./resize/resizer.js"
import {TabDragger} from "./parts/tab_dragger.js"
import {leaf_management} from "./parts/leaf_management.js"
import {miniSlate as slate} from "../../context/mini_slate.js"
import {shock_dropzone} from "../../tools/shockdrop/dropzone.js"
import {dropped_files} from "../../tools/shockdrop/utils/dropped_files.js"
import {drag_has_files} from "../../tools/shockdrop/utils/drag_has_files.js"
import {make_layout_renderer} from "./rendering/utils/make_layout_renderer.js"

export const ConstructEditor = slate.carbon({styles}, use => {
	const {layout, panels} = use.context

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

	const dropzone = use.prepare(() => shock_dropzone({
		predicate: drag_has_files,
		handle_drop: event => {
			use.context.drops.on_file_drop.publish(dropped_files(event))
		},
	}))

	use.setup(() => use
		.context
		.drops
		.on_file_drop_already_handled_internally(
			() => dropzone.reset_indicator()
		)
	)

	function prevent(event: Event) {
		event.preventDefault()
	}

	return html`
		<div
			class=layout
			@contextmenu=${prevent}
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

