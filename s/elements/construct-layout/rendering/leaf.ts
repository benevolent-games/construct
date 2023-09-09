
import {html} from "lit"

import {Layout} from "../parts/layout.js"
import {LayoutMeta} from "./utils/layout_meta.js"

export const render_leaf = (meta: LayoutMeta) => (node: Layout.Leaf, path: number[]) => html`
	<div class=leaf>
		<slot name="${`leaf-${path.join('-')}`}"></slot>
	</div>
`

