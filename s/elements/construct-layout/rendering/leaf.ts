
import {html} from "lit"

import {Layout} from "../parts/layout.js"
import {LayoutMeta} from "./utils/layout_meta.js"

export const render_leaf = (_: LayoutMeta) => (
		_: Layout.Leaf,
		path: number[] = [],
	) => html`

	<slot name="${`leaf-${path.join('-')}`}"></slot>
`

