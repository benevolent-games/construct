
import {html} from "@benev/slate"

import {styles} from "./styles.js"
import {slate} from "../../context/slate.js"
import {PanelProps, panel} from "../panel_parts.js"
import {icon_feather_help_circle} from "../../icons/groups/feather/help-circle.js"

export const UnknownPanel = panel({
	label: "unknown",
	icon: icon_feather_help_circle,
	view: slate.shadow_view({name: "unknown", styles}, _use => ({}: PanelProps) => {
		return html`
			<h1>unknown</h1>
		`
	}),
})

