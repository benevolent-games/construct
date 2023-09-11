
import {html, css} from "lit"
import {ShaleView} from "@benev/slate"

import {tile, view} from "../../framework/frontend.js"
import {sprite_home} from "../../sprites/groups/feather/home.js"

export const AboutTile = tile({
	label: "about",
	icon: sprite_home,
	view: view(_ => class extends ShaleView {
		static styles = css``

		render() {
			return html`
				<p>...about...</p>
			`
		}
	}),
})

