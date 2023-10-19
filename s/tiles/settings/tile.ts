
import {html} from "@benev/slate"

import {styles} from "./styles.js"
import {tile} from "../tile_parts.js"
import {obsidian} from "../../context/context.js"
import {sprite_settings} from "../../sprites/groups/feather/settings.js"

export const SettingsTile = tile({
	label: "settings",
	icon: sprite_settings,
	view: obsidian({name: "settings", styles}, () => () => {
		return html`
			<h1>settings</h1>
		`
	}),
})

