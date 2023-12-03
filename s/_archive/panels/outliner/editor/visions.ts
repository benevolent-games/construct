
import {icon_tabler_sun_high} from "../../../icons/groups/tabler/sun-high.js"
import {icon_tabler_folder_open} from "../../../icons/groups/tabler/folder-open.js"
import {icon_tabler_folder_filled} from "../../../icons/groups/tabler/folder-filled.js"
import {icon_tabler_vector_triangle} from "../../../icons/groups/tabler/vector-triangle.js"
import {icon_tabler_triangle_square_circle} from "../../../icons/groups/tabler/triangle-square-circle.js"
import {icon_tabler_triangle_square_circle_filled} from "../../../icons/groups/tabler/triangle-square-circle-filled.js"

import {OutlinerVisions} from "./types.js"
import {EditorConcepts} from "../../../context/controllers/outline/editor.js"

export const editorVisions = {

	folder: {
		render_icon: meta => (meta.otherReferences.length > 0)
			? meta.folderStates.obtain(meta.block.id).opened
				? icon_tabler_triangle_square_circle
				: icon_tabler_triangle_square_circle_filled
			: meta.folderStates.obtain(meta.block.id).opened
				? icon_tabler_folder_open
				: icon_tabler_folder_filled
	},

	prop: {
		render_icon: _meta => icon_tabler_vector_triangle,
	},

	light: {
		render_icon: _meta => icon_tabler_sun_high,
	},

} satisfies OutlinerVisions<EditorConcepts>

