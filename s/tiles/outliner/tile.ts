
import {html, css} from "@benev/slate"

import {tile} from "../tile_parts.js"
import {obsidian} from "../../context/context.js"
import {sprite_folder} from "../../sprites/groups/feather/folder.js"

const styles = css``

export const OutlinerTile = tile({
	label: "outliner",
	icon: sprite_folder,
	view: obsidian({styles}, () => () => {
		return html`
			<p>...outliner...</p>
		`
	}),
})

