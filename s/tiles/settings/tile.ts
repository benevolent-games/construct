
import {html, css} from "lit"
import {ShaleView} from "@benev/slate"

import {tile, view} from "../../framework/frontend.js"
import {sprite_settings} from "../../sprites/groups/feather/settings.js"

export const SettingsTile = tile({
	label: "settings",
	icon: sprite_settings,
	view: view(_ => class extends ShaleView {
		static styles = css``

		render() {
			return html`
				<p>...settings...</p>
			`
		}
	}),
})

