
import {html} from "lit"
import {QuickElement} from "@benev/frog"

import {Context} from "../../context/context.js"
import {human_bytes} from "../../tools/human_bytes.js"
import {AssetProp} from "../../context/controllers/catalog/parts/types.js"
import { Mesh } from "@babylonjs/core/Meshes/mesh.js"

export const EdCatalog = (context: Context) => class extends QuickElement {

	#add_to_graph(prop: AssetProp) {
		return () => {
			context.graph.add({
				name: prop.name,
				node: prop.top_lod.node,
			})
		}
	}

	render() {
		return html`
			<div>catalog</div>
			<ul>
				${context.catalog.state.glbs.map(glb => html`
					<li>
						<div>${glb.name}</div>
						<div>${human_bytes(glb.size)}</div>

						<h2>asset container</h2>
						<ul>
							<li>transform nodes: ${glb.container.transformNodes.length}</li>
							<li>meshes: ${glb.container.meshes.length}</li>
							<li>materials: ${glb.container.materials.length}</li>
							<li>textures: ${glb.container.textures.length}</li>
						</ul>

						<h2>props</h2>
						<ol>
							${glb.props.map(prop => html`
								<li>
									${prop.name} (${prop.top_lod.node instanceof Mesh ? "mesh" : "transform"})
									<button @click=${this.#add_to_graph(prop)}>add</button>
								</li>
							`)}
						</ol>
					</li>
				`)}
			</ul>
		`
	}
}

