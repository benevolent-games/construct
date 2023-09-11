
import {html, css} from "lit"
import {ShaleView} from "@benev/slate"

import {tile, view} from "../../framework/frontend.js"
import {sprite_box} from "../../sprites/groups/feather/box.js"

export const ViewportTile = tile({
	label: "viewport",
	icon: sprite_box,
	view: view(_ => class extends ShaleView {
		static styles = css``

		render() {
			return html`
				<p>...viewport...</p>
			`
		}
	}),
})

