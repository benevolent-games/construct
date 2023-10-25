
import {html} from "@benev/slate"

import {styles} from "./styles.js"
import {panel} from "../panel_parts.js"
import {obsidian} from "../../context/context.js"
import {sprite_settings} from "../../sprites/groups/feather/settings.js"

export const SettingsPanel = panel({
	label: "settings",
	icon: sprite_settings,
	view: obsidian({name: "settings", styles}, () => () => {
		return html`
			<h1>settings</h1>
		`
	}),
})

