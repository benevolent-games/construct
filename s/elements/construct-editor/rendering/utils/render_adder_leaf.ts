
import {html} from "lit"
import {LayoutMeta} from "./layout_meta.js"
import {Layout} from "../../../../context/controllers/layout/parts/types.js"
import {panels} from "../../../../panels/panels.js"

export function render_adder_leaf(
		{layout}: LayoutMeta,
		pane: Layout.Pane,
	) {

	return html`${Object.entries(panels)
		.filter(([,panel]) => panel !== panels.AdderPanel)
		.map(([name, panel]) => html`
			<button
				@click=${() => {
					const [,leafIndex] = layout.actions.add_leaf(
						pane.id,
						name as any,
					)
					layout.actions.set_pane_active_leaf(
						pane.id,
						leafIndex,
					)
				}}
				>
				${panel.icon}
				<span>${panel.label}</span>
			</button>
		`)}`
}

