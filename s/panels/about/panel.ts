
import {html} from "@benev/slate"

import {styles} from "./styles.js"
import {obsidian} from "../../context/context.js"
import {PanelProps, panel} from "../panel_parts.js"
import {sprite_b} from "../../sprites/groups/benevolent/b.js"
import {sprite_info} from "../../sprites/groups/feather/info.js"

export const AboutPanel = panel({
	label: "about",
	icon: sprite_info,
	view: obsidian({name: "about", styles}, _use => ({}: PanelProps) => {
		return html`
			<div class=logo>
				${sprite_b}
			</div>
		`
	}),
})

