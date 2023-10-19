
import {css, html} from "@benev/slate"

import {tile} from "../tile_parts.js"
import {obsidian} from "../../context/context.js"
import {sprite_b} from "../../sprites/groups/benevolent/b.js"
import {sprite_info} from "../../sprites/groups/feather/info.js"

export const AboutTile = tile({
	label: "about",
	icon: sprite_info,
	view: obsidian({name: "about", styles: styles()}, () => () => {
		return html`
			<div class=logo>
				${sprite_b}
			</div>
		`
	}),
})

function styles() {
	return css`
		:host {
			display: block;
			position: absolute;
			inset: 0;
		}

		.logo {
			display: flex;
			justify-content: center;
			width: 100%;
			height: 100%;

			> svg {
				width: 20em;
				max-width: 100%;
				max-height: 100%;
			}
		}
	`
}

