
import {html} from "lit"
import {QuickElement} from "@benev/frog"
import {Mesh} from "@babylonjs/core/Meshes/mesh.js"

import {style} from "./style.css.js"
import {Context} from "../../context/context.js"
import {human_bytes} from "../../tools/human_bytes.js"
import {AssetProp, Glb} from "../../context/controllers/catalog/parts/types.js"

export const EdCatalog = (context: Context) => class extends QuickElement {
	static styles = style

	#add_to_graph(prop: AssetProp) {
		return () => {
			context.graph.add({
				name: prop.name,
				node: prop.top_lod.node,
			})
		}
	}

	#render_glb_stats({size, container}: Glb) {
		return html`
			<ul class=glb-stats>
				<li>${human_bytes(size)}</li>
				<li>${container.transformNodes.length} transforms</li>
				<li>${container.meshes.length} meshes</li>
				<li>${container.materials.length} materials</li>
				<li>${container.textures.length} textures</li>
			</ul>
		`
	}

	#render_glb_props(props: AssetProp[]) {
		const sorted = props
			.sort((a, b) => a.name.localeCompare(b.name))

		const proptype = (prop: AssetProp) => (
			prop.top_lod.node instanceof Mesh
				? "mesh"
				: "transform"
		)

		return html`
			<ol class=glb-props>
				${sorted.map(prop => html`
					<li data-type="${proptype(prop)}">
						<button @click=${this.#add_to_graph(prop)}>
							${prop.name}
						</button>
					</li>
				`)}
			</ol>
		`
	}

	render() {
		return html`
			<div class=container>

				${context.catalog.state.glbs.length === 0
					? html`<h2>catalog</h2>`
					: undefined}

				${context.catalog.state.glbs.map(glb => html`
					<div class=glb>
						<h3>${glb.name}</h3>
						${this.#render_glb_stats(glb)}
						${this.#render_glb_props(glb.props)}
					</div>
				`)}
			</div>
		`
	}
}

