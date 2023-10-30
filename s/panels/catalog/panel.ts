
import {html} from "lit"
import {Mesh} from "@babylonjs/core/Meshes/mesh.js"
import {generateId} from "@benev/toolbox/x/utils/generate-id.js"

import {styles} from "./styles.js"
import {slate} from "../../context/slate.js"
import {GlbSlot} from "../../context/state.js"
import {Context} from "../../context/context.js"
import {PanelProps, panel} from "../panel_parts.js"
import {human_bytes} from "../../tools/human_bytes.js"
import {sprite_book_open} from "../../sprites/groups/feather/book-open.js"
import {GlbProp, Glb} from "../../context/controllers/warehouse/parts/types.js"

const placeholder_asset_icon = "https://i.imgur.com/LtadIlN.webp"

export const CatalogPanel = panel({
	label: "catalog",
	icon: sprite_book_open,
	view: slate.obsidian({name: "catalog", styles}, use => ({}: PanelProps) => {
		const {context} = use
		const {warehouse} = context
		use.watch(() => context.state.slots)

		const {manifest} = warehouse
		const {
			render_glb_stats,
			render_glb_props,
		} = helpers(use.context)

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

function helpers(context: Context) {
	function instance_into_world(slot: GlbSlot, prop: GlbProp) {
		return () => context.actions.items.add([{
			folderId: context.state.outline.id,
			item: {
				id: generateId(),
				kind: "instance",
				selected: false,
				visible: true,
				name: prop.name,
				address: {slot: slot.id, prop: prop.name},
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

