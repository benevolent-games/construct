
import {html} from "@benev/slate"

import {tile} from "../tile_parts.js"
import {obsidian} from "../../context/context.js"
import {sprite_help_circle} from "../../sprites/groups/feather/help-circle.js"

export const UnknownTile = tile({
	label: "unknown",
	icon: sprite_help_circle,
	view: obsidian({name: "unknown"}, () => () => {
		return html`
			<p>...unknown...</p>
		`
	}),
})

