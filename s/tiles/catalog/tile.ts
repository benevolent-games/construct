
import {html, css} from "lit"
import {ShaleView} from "@benev/slate"

import {tile, view} from "../../framework/frontend.js"
import {sprite_book_open} from "../../sprites/groups/feather/book-open.js"

export const CatalogTile = tile({
	label: "catalog",
	icon: sprite_book_open,
	view: view(_ => class extends ShaleView {
		static styles = css``

		render() {
			return html`
				<p>...catalog...</p>
			`
		}
	}),
})

