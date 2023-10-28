
import {html} from "@benev/slate"

import {styles} from "./styles.js"
import {slate} from "../../context/slate.js"
import {PanelProps, panel} from "../panel_parts.js"
import {sprite_help_circle} from "../../sprites/groups/feather/help-circle.js"

export const UnknownPanel = panel({
	label: "unknown",
	icon: sprite_help_circle,
	view: slate.obsidian({name: "unknown", styles}, _use => ({}: PanelProps) => {
		return html`
			<h1>unknown</h1>
		`
	}),
})

