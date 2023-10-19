
import {html} from "@benev/slate"

import {styles} from "./styles.js"
import {tile} from "../tile_parts.js"
import {obsidian} from "../../context/context.js"
import {sprite_sliders} from "../../sprites/groups/feather/sliders.js"

export const InspectorTile = tile({
	label: "inspector",
	icon: sprite_sliders,
	view: obsidian({name: "inspector", styles}, () => () => {
			return html`
				<h1>inspector</h1>
			`
	}),
})

