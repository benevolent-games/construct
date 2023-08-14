
import {TemplateResult, html} from "lit"
import {QuickElement} from "@benev/frog"
import {Context} from "../../context/context.js"
import {human_bytes} from "../../tools/human_bytes.js"

export const EdCatalog = (context: Context) => class extends QuickElement {

	#list(stuff: TemplateResult[]) {
		return html`
			<ol>
				${stuff.map(s => html`
					<li>${s}</li>
				`)}
			</ol>
		`
	}

	render() {
		const name = (n: {name: string}) => html`${n.name}`
		return html`
			<div>catalog</div>
			<ul>
				${context.catalog.state.glbs.map(glb => html`
					<li>
						<div>${glb.name}</div>
						<div>${human_bytes(glb.size)}</div>

						<h2>transform nodes</h2>
						${this.#list(glb.container.transformNodes.map(name))}

						<h2>meshes</h2>
						${this.#list(glb.container.meshes.map(name))}

						<h2>materials</h2>
						${this.#list(glb.container.materials.map(name))}

						<h2>textures</h2>
						${this.#list(glb.container.textures.map(name))}
					</li>
				`)}
			</ul>
		`
	}
}

