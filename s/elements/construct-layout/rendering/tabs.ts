
import {html} from "lit"
import {Layout} from "../parts/layout.js"
import {sprite_plus} from "../../../sprites/groups/feather/plus.js"

export function render_tabs(leaves: Layout.Leaf[]) {
	return html`
		<div class=tabs>
			${leaves.map((leaf, index) => html`
				<div class=tab>
					${index}
				</div>
			`)}
			<div class=plus>${sprite_plus}</div>
		</div>
	`
}

