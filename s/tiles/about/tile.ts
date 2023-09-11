
import {html, css} from "lit"
import {ShaleView} from "@benev/slate"

import {tile, view} from "../../framework/frontend.js"
import {sprite_info} from "../../sprites/groups/feather/info.js"

export const AboutTile = tile({
	label: "about",
	icon: sprite_info,
	view: view(_ => class extends ShaleView {
		static styles = css``

		render() {
			return html`
				<p>ABOUT</p>
			`
		}
	}),
})

