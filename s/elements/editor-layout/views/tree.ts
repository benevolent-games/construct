
import {css} from "lit"

import {view} from "../../frontend.js"
import {Layout} from "../parts/layout.js"
import {layout_views} from "../parts/layout_views.js"
import {recursively_render_layout} from "../parts/recursively_render_layout.js"

export const TreeView = view({
		name: "tree",
		views: layout_views,
		styles: css`
			:host {
				display: flex;
				width: 100%;
				height: 100%;
			}
		`,
	}).render(_context => views => _use => (cell: Layout.Cell) => {

	return recursively_render_layout(views, cell)
})

