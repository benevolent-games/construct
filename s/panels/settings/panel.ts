
import {html} from "@benev/slate"

import {styles} from "./styles.js"
import {obsidian} from "../../context/context.js"
import {PanelProps, panel} from "../panel_parts.js"
import {sprite_settings} from "../../sprites/groups/feather/settings.js"

export const SettingsPanel = panel({
	label: "settings",
	icon: sprite_settings,
	view: obsidian({name: "settings", styles}, use => ({}: PanelProps) => {

		function reset_layout() {
			use.context.layout.reset_to_default()
		}

		return html`
			<button class=based @click=${reset_layout}>
				reset layout to default
			</button>
		`
	}),
})

