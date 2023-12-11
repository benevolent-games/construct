
import {html} from "@benev/slate"

import {styles} from "./styles.js"
import {slate} from "../../context/slate.js"
import {PanelProps, panel} from "../panel_parts.js"
import {icon_benev_b} from "../../icons/groups/benev/b.js"
import {icon_feather_info} from "../../icons/groups/feather/info.js"

export const AboutPanel = panel({
	label: "about",
	icon: icon_feather_info,
	view: slate.shadow_view(use => ({}: PanelProps) => {
		use.styles(styles)
		use.name("about")
		return html`
			<div class=logo>
				${icon_benev_b}
			</div>
		`
	}),
})

