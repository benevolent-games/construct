
import {html} from "@benev/slate"

import {styles} from "./styles.js"
import {slate} from "../../context/slate.js"
import {PanelProps, panel} from "../panel_parts.js"
import {icon_feather_settings} from "../../icons/groups/feather/settings.js"

export const SettingsPanel = panel({
	label: "settings",
	icon: icon_feather_settings,
	view: slate.shadow_view({name: "settings", styles}, use => ({}: PanelProps) => {

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

