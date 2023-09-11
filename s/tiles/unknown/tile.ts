
import {html, css} from "lit"
import {ShaleView} from "@benev/slate"

import {tile, view} from "../../framework/frontend.js"
import {sprite_help_circle} from "../../sprites/groups/feather/help-circle.js"

export const UnknownTile = tile({
	label: "unknown",
	icon: sprite_help_circle,
	view: view(_ => class extends ShaleView {
		static styles = css``

		render() {
			return html`
				<p>...unknown...</p>
			`
		}
	}),
})

