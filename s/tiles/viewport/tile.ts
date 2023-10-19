
import {html} from "@benev/slate"

import {tile} from "../tile_parts.js"
import {obsidian} from "../../context/context.js"
import {sprite_box} from "../../sprites/groups/feather/box.js"

export const ViewportTile = tile({
	label: "viewport",
	icon: sprite_box,
	view: obsidian({name: "viewport"}, () => () => {
		return html`
			<p>...viewport...</p>
		`
	}),
})

