
import {html} from "@benev/slate"

import {styles} from "./styles.js"
import {tile} from "../tile_parts.js"
import {obsidian} from "../../context/context.js"
import {sprite_folder} from "../../sprites/groups/feather/folder.js"

export const OutlinerTile = tile({
	label: "outliner",
	icon: sprite_folder,
	view: obsidian({name: "outliner", styles}, () => () => {
		return html`
			<h1>outliner</h1>
		`
	}),
})

