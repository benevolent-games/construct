
import {html} from "lit"

import {Layout} from "../parts/layout.js"
import {LayoutMeta} from "./utils/layout_meta.js"

export const render_leaf = (_: LayoutMeta) => (
		leaf: Layout.Leaf,
		_: number[] = [],
	) => html`

	<slot name="leaf-${leaf.id}"></slot>
`

