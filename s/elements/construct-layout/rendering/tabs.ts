
import {html} from "lit"

import {Layout} from "../parts/layout.js"
import {sprite_plus} from "../../../sprites/groups/feather/plus.js"

export const render_tab = (leaf: Layout.Leaf, path: number[]) => html`
	<div class=tab>
		${leaf.tab}
	</div>
`

export const render_tabs = (leaves: Layout.Leaf[], path: number[]) => html`
	<div class=tabs>
		${leaves.map((leaf, index) => render_tab(leaf, [...path, index]))}
		<div class=plus>${sprite_plus}</div>
	</div>
`

