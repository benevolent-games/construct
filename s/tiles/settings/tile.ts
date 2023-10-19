
import {html} from "@benev/slate"

import {tile} from "../tile_parts.js"
import {obsidian} from "../../context/context.js"
import {sprite_settings} from "../../sprites/groups/feather/settings.js"

export const SettingsTile = tile({
	label: "settings",
	icon: sprite_settings,
	view: obsidian({name: "settings"}, () => () => {
		return html`
			<p>...settings...</p>
		`
	}),
})

