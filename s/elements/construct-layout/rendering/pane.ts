
import {html} from "lit"

import {render_tabs} from "./tabs.js"
import {render_leaf} from "./leaf.js"
import {Layout} from "../parts/layout.js"
import {tiles} from "../../../tiles/tiles.js"
import {LayoutMeta} from "./utils/layout_meta.js"
import {sizing_styles} from "../parts/sizing_styles.js"

export const render_pane = (meta: LayoutMeta) => (
		node: Layout.Pane,
		pane_path: number[],
	) => html`

	<div
		class=pane
		style="${sizing_styles(node.size)}"
		@pointerdown=${middle_click(() => meta.layout.split_pane(pane_path))}>

		${render_tabs(meta, node, pane_path)}

		<div class=leaf>
			${node.active_leaf_index === undefined
				? html`
					${Object.entries(tiles).map(([name, tile]) => html`
						<button
							@click=${() => meta.layout.set_pane_active_leaf(
								pane_path,
								meta.layout.add_leaf(
									pane_path,
									name as keyof typeof tiles,
								).at(-1)!,
							)}>
							<span>${tile.icon}</span>
							<span>${tile.label}</span>
						</button>
					`)}
				`
				: render_leaf(meta)(
					node.children[node.active_leaf_index],
					[...pane_path, node.active_leaf_index],
				)}
		</div>
	</div>
`

function middle_click(fun: () => void) {
	return (event: PointerEvent) => {
		if (event.button === 1)
			fun()
	}
}

