
import {html} from "lit"
import {QuickElement} from "@benev/frog"
import {Context} from "../../context/context.js"
import {human_bytes} from "../../tools/human_bytes.js"

export const EdCatalog = (context: Context) => class extends QuickElement {

	render() {
		return html`
			<div>catalog</div>
			<ul>
				${context.catalog.state.glbs.map(glb => html`
					<li>
						<div>${glb.name}</div>
						<div>${human_bytes(glb.size)}</div>
					</li>
				`)}
			</ul>
		`
	}
}

