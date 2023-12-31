
import {html} from "lit"
import {Mesh} from "@babylonjs/core/Meshes/mesh.js"

import {styles} from "./styles.js"
import {slate} from "../../context/slate.js"
import {GlbSlot} from "../../context/state.js"
import {freshId} from "../../tools/fresh_id.js"
import {PanelProps, panel} from "../panel_parts.js"
import {human_bytes} from "../../tools/human_bytes.js"
import {Edcore} from "../../context/controllers/edcore/controller.js"
import {init_spatial} from "../../context/domains/outline/spatial.js"
import {icon_feather_book_open} from "../../icons/groups/feather/book-open.js"
import {Glb, GlbProp} from "../../context/controllers/world/warehouse/parts/types.js"

const placeholder_asset_icon = "https://i.imgur.com/LtadIlN.webp"

export const CatalogPanel = panel({
	label: "catalog",
	icon: icon_feather_book_open,
	view: slate.obsidian({name: "catalog", styles}, use => ({}: PanelProps) => {
		const {edcore, world: {warehouse}} = use.context
		use.watch(() => edcore.state.slots)

		const {manifest} = warehouse
		const {
			render_glb_stats,
			render_glb_props,
		} = helpers(edcore)

		return html`
			<div class="container">
				${manifest.length === 0 ? html`
					<div class=intro>
						<h1>asset catalog</h1>
						<p>drag-and-drop a glb file</p>
					</div>
				` : undefined}

				${manifest.map(({slot, glb}) => html`
					<div class=glb>
						<h3>${slot.name}</h3>
						${render_glb_stats(glb)}
						${render_glb_props(slot, glb)}
					</div>
				`)}
			</div>
		`
	}),
})

function helpers(edcore: Edcore) {
	function instance_into_world(slot: GlbSlot, prop: GlbProp) {
		return () => edcore.actions.outline.add([{
			folderId: edcore.state.outline.id,
			item: {
				id: freshId(),
				kind: "instance",
				selected: false,
				visible: true,
				name: prop.name,
				address: {slot: slot.id, prop: prop.name},
				spatial: init_spatial(),
			},
		}])
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

	function render_glb_props(slot: GlbSlot, glb: Glb) {
		const sorted = glb.props
			.sort((a, b) => a.name.localeCompare(b.name))

		const proptype = (prop: GlbProp) => (
			prop.top_lod.node instanceof Mesh
				? "mesh"
				: "transform"
		)

		return html`
			<ol class=glb-props>
				${sorted.map(prop => html`
					<li data-type="${proptype(prop)}">
						<button @click=${instance_into_world(slot, prop)}>
							<img src="${placeholder_asset_icon}" alt="" draggable="false"/>
							<span>${prop.name}</span>
						</button>
					</li>
				`)}
			</ol>
		`
	}

	return {render_glb_props, render_glb_stats}
}

