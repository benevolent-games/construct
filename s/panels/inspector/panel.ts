
import {html} from "@benev/slate"

import {styles} from "./styles.js"
import {slate} from "../../context/slate.js"
import {PanelProps, panel} from "../panel_parts.js"
import {icon_feather_sliders} from "../../sprites/groups/feather/sliders.js"

export const InspectorPanel = panel({
	label: "inspector",
	icon: icon_feather_sliders,
	view: slate.obsidian({name: "inspector", styles}, () => ({}: PanelProps) => {
		return html`
			<h1>inspector</h1>
		`
	}),
})

