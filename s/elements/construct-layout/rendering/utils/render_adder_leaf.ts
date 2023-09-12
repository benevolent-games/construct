
import {html} from "lit"
import {LayoutMeta} from "./layout_meta.js"
import {tiles} from "../../../../tiles/tiles.js"

export function render_adder_leaf(
		{layout}: LayoutMeta,
		pane_path: number[],
	) {

	return html`${Object.entries(tiles)
		.filter(([,tile]) => tile !== tiles.AdderTile)
		.map(([name, tile]) => html`
			<button
				@click=${() => layout.set_pane_active_leaf(
					pane_path,
					layout.add_leaf(
						pane_path,
						name as keyof typeof tiles,
					).at(-1)!,
				)}>
				${tile.icon}
				<span>${tile.label}</span>
			</button>
		`)}`
}

