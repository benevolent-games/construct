
import {css} from "lit"

import {view} from "../../view.js"
import {Layout} from "../parts/layout.js"
import {layout_views} from "../parts/layout_views.js"
import {recursively_render_layout} from "../parts/recursively_render_layout.js"

export const TreeView = view("tree", context => ({

	render: use => (layout: Layout.Cell) => {
		const views = use.setup(layout_views(context))
		return recursively_render_layout(views, layout)
	},

	styles: css`
		:host {
			display: flex;
			width: 100%;
			height: 100%;
		}
	`,
}))

