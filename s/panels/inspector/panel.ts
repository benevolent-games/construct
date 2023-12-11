
import {html} from "@benev/slate"

import {styles} from "./styles.js"
import {slate} from "../../context/slate.js"
import {PanelProps, panel} from "../panel_parts.js"
import {icon_feather_sliders} from "../../icons/groups/feather/sliders.js"

export const InspectorPanel = panel({
	label: "inspector",
	icon: icon_feather_sliders,
	view: slate.shadow_view(use => ({}: PanelProps) => {
		use.styles(styles)
		use.name("inspector")
		return html`
			<h1>inspector</h1>
		`
	}),
})

