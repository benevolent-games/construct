
import {html} from "lit"

import {Layout} from "../parts/layout.js"
import {AdderTab} from "./tabs/adder_tab.js"
import {LayoutMeta} from "./utils/layout_meta.js"
import {OrdinaryTab} from "./tabs/ordinary_tab.js"

export const render_tabs = (
		meta: LayoutMeta,
		pane: Layout.Pane,
		pane_path: number[],
	) => html`

	${pane.children.map((leaf, leaf_index) => OrdinaryTab({
			meta,
			pane,
			leaf,
			pane_path,
			leaf_index,
		}))}

	${AdderTab({meta, pane, pane_path})}
`

