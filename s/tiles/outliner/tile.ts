
import {html, css} from "lit"
import {ShaleView} from "@benev/slate"

import {tile, view} from "../../framework/frontend.js"
import {sprite_list} from "../../sprites/groups/feather/list.js"

export const OutlinerTile = tile({
	label: "outliner",
	icon: sprite_list,
	view: view(_ => class extends ShaleView {
		static styles = css``

		render() {
			return html`
				<p>...outliner...</p>
			`
		}
	}),
})

