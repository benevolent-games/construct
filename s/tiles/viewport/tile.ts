
import {html} from "@benev/slate"

import {styles} from "./styles.js"
import {tile} from "../tile_parts.js"
import {obsidian} from "../../context/context.js"
import {sprite_box} from "../../sprites/groups/feather/box.js"

export const ViewportTile = tile({
	label: "viewport",
	icon: sprite_box,
	view: obsidian({name: "viewport", styles}, () => () => {
		return html`
			<h1>viewport</h1>
		`
	}),
})

