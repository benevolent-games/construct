
import {html} from "@benev/slate"

import {styles} from "./styles.js"
import {tile} from "../tile_parts.js"
import {obsidian} from "../../context/context.js"
import {sprite_b} from "../../sprites/groups/benevolent/b.js"
import {sprite_info} from "../../sprites/groups/feather/info.js"

export const AboutTile = tile({
	label: "about",
	icon: sprite_info,
	view: obsidian({name: "about", styles}, () => () => {
		return html`
			<div class=logo>
				${sprite_b}
			</div>
		`
	}),
})

