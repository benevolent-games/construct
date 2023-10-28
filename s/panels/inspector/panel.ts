
import {html} from "@benev/slate"

import {styles} from "./styles.js"
import {frontend} from "../../context/frontend.js"
import {PanelProps, panel} from "../panel_parts.js"
import {sprite_sliders} from "../../sprites/groups/feather/sliders.js"

export const InspectorPanel = panel({
	label: "inspector",
	icon: sprite_sliders,
	view: frontend.obsidian({name: "inspector", styles}, () => ({}: PanelProps) => {
		return html`
			<h1>inspector</h1>
		`
	}),
})

