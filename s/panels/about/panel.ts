
import {html} from "@benev/slate"

import {styles} from "./styles.js"
import {slate} from "../../context/slate.js"
import {PanelProps, panel} from "../panel_parts.js"
import {sprite_benev_b} from "../../sprites/groups/benev/b.js"
import {sprite_feather_info} from "../../sprites/groups/feather/info.js"

export const AboutPanel = panel({
	label: "about",
	icon: sprite_feather_info,
	view: slate.obsidian({name: "about", styles}, _use => ({}: PanelProps) => {
		return html`
			<div class=logo>
				${sprite_benev_b}
			</div>
		`
	}),
})

