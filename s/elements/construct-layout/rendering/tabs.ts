
import {html} from "lit"

import {Layout} from "../parts/layout.js"
import {LayoutMeta} from "./utils/layout_meta.js"

export const render_tabs = (
		meta: LayoutMeta,
		pane: Layout.Pane,
		pane_path: number[],
	) => html`

	${pane.children.map((leaf, leaf_index) => meta.tab_views.OrdinaryTab({
			meta,
			pane,
			leaf,
			pane_path,
			leaf_index,
		}))}

	${meta.tab_views.AdderTab({meta, pane, pane_path})}
`

