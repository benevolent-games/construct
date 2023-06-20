
import {LitElement, html} from "lit"
import {mixinContextRequirement, mixinCss} from "@chasemoskal/magical"

import {style} from "./style.js"
import {Context} from "../context.js"

@mixinCss(style)
export class EditOutliner extends mixinContextRequirement<Context>()(LitElement) {

	render() {
		const world = this.context.world.state

		return html`
			<p>scene: ${world.details.scene_name}</p>
			<p>vertices: ${world.details.vertex_count}</p>
			<ol>
				${world.instances.map(instance => html`
					<li data-id="${instance.id}">
						${instance.name}
					</li>
				`)}
			</ol>
		`
	}
}

