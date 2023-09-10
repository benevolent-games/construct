
import {html} from "lit"

import {Layout} from "../parts/layout.js"
import {LayoutMeta} from "./utils/layout_meta.js"
import {leaf_slot_name} from "../parts/leaf_slot_name.js"

export const render_leaf = (_: LayoutMeta) => (
		_: Layout.Leaf,
		path: number[] = [],
	) => html`

	<slot name="${leaf_slot_name(path)}"></slot>
`

