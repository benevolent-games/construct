
import {html} from "@benev/slate"

import {styles} from "./styles.css.js"
import {Resizer} from "./resize/resizer.js"
import {carbon} from "../../context/context.js"
import {TabDragger} from "./parts/tab_dragger.js"
import {useDropzone} from "../../tools/shockdrop/use_dropzone.js"
import {file_is_glb} from "../../tools/shockdrop/utils/file_is_glb.js"
import {dropped_files} from "../../tools/shockdrop/utils/dropfiles.js"
import {drag_has_files} from "../../tools/shockdrop/utils/drag_has_files.js"
import {make_layout_renderer} from "./rendering/utils/make_layout_renderer.js"
import { use_layout } from "./parts/use_layout.js"

export const ConstructEditor = carbon({styles}, use => {
	const layout = use_layout(use)
	const resizer = use.prepare(() => new Resizer(() => use.rerender()))
	const render_layout = use.prepare(() => make_layout_renderer({
		layout,
		resizer,
		dragger: new TabDragger(layout),
	}))

	const dropzone = useDropzone({
		use,
		predicate: drag_has_files,
		handle_drop: event => {
			for (const file of dropped_files(event)) {
				if (file_is_glb(file))
					use.context.warehouse.add_glb_file(file)
				else
					console.warn("unrecognized filetype", file.name)
			}
		},
	})

	use.setup(() => use.context.on_file_drop_already_handled_internally(() => {
		dropzone.reset_indicator()
	}))

	return html`
		<div
			class=layout
			@pointermove=${resizer.track_mouse_movement}
			@pointerup=${resizer.end}
			?data-dropzone-indicator=${dropzone.indicator}
			@dragover=${dropzone.dragover}
			@dragleave=${dropzone.dragleave}
			@drop=${dropzone.drop}
			>

			${render_layout(layout.root, [])}
		</div>
	`
})

