
import {html, css} from "lit"
import {ShaleView} from "@benev/slate"

import {tile, view} from "../../framework/frontend.js"
import {sprite_sliders} from "../../sprites/groups/feather/sliders.js"

export const InspectorTile = tile({
	label: "inspector",
	icon: sprite_sliders,
	view: view(_ => class extends ShaleView {
		static styles = css``

		render() {
			return html`
				<p>...inspector...</p>
			`
		}
	}),
})

