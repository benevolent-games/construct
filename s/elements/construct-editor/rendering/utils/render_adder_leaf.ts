
import {html} from "lit"
import {LayoutMeta} from "./layout_meta.js"
import {panels} from "../../../../panels/panels.js"

export function render_adder_leaf(
		{layout}: LayoutMeta,
		pane_path: number[],
	) {

	return html`${Object.entries(panels)
		.filter(([,panel]) => panel !== panels.AdderPanel)
		.map(([name, panel]) => html`
			<button
				@click=${() => layout.set_pane_active_leaf(
					pane_path,
					layout.add_leaf(
						pane_path,
						name as keyof typeof panels,
					).at(-1)!,
				)}>
				${panel.icon}
				<span>${panel.label}</span>
			</button>
		`)}`
}

