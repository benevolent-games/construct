
import {html} from "lit"

import {styles} from "./styles.js"
import {tile} from "../tile_parts.js"
import {Mesh} from "@babylonjs/core/Meshes/mesh.js"
import {human_bytes} from "../../tools/human_bytes.js"
import {context, obsidian} from "../../context/context.js"
import {sprite_book_open} from "../../sprites/groups/feather/book-open.js"
import {AssetProp, Glb} from "../../context/controllers/catalog/parts/types.js"

export const CatalogTile = tile({
	label: "catalog",
	icon: sprite_book_open,
	view: obsidian({name: "catalog", styles}, () => () => {
		return html`
			<div class=container>

				${context.catalog.state.glbs.length === 0
					? html`<h2>catalog</h2>`
					: undefined}

				${context.catalog.state.glbs.map(glb => html`
					<div class=glb>
						<h3>${glb.name}</h3>
						${render_glb_stats(glb)}
						${render_glb_props(glb.props)}
					</div>
				`)}
			</div>
		`
	}),
})

function add_to_graph(prop: AssetProp) {
	return () => context.graph.add({
		name: prop.name,
		node: prop.top_lod.node,
	})
}

function render_glb_stats({size, container}: Glb) {
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

function render_glb_props(props: AssetProp[]) {
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
					<button @click=${add_to_graph(prop)}>
						${prop.name}
					</button>
				</li>
			`)}
		</ol>
	`
}

