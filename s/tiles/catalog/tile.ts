
import {html} from "lit"

import {styles} from "./styles.js"
import {tile} from "../tile_parts.js"
import {obsidian} from "../../context/context.js"
import {sprite_book_open} from "../../sprites/groups/feather/book-open.js"

export const CatalogTile = tile({
	label: "catalog",
	icon: sprite_book_open,
	view: obsidian({name: "catalog", styles}, () => () => {
		return html`
			<h1>catalog</h1>
		`
	}),
})

