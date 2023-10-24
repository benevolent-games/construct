
import {html} from "lit"

import {styles} from "./styles.js"
import {tile} from "../tile_parts.js"
import {GlbSlot} from "../../context/state.js"
import {obsidian} from "../../context/context.js"
import {human_bytes} from "../../tools/human_bytes.js"
import {generateId} from "@benev/toolbox/x/utils/generate-id.js"
import {Glb} from "../../context/controllers/catalog/parts/types.js"
import {sprite_tabler_layout_list} from "../../sprites/groups/tabler/layout-list.js"
import {sprite_tabler_grip_vertical} from "../../sprites/groups/tabler/grip-vertical.js"

export const SlotsTile = tile({
	label: "slots",
	icon: sprite_tabler_layout_list,
	view: obsidian({name: "slots", styles}, use => () => {
		const {context} = use
		const slots = use.watch(() => context.state.slots)

		function render_slot(slot: GlbSlot) {
			const glb = slot.glb_hash
				? context.warehouse.get_glb(slot.glb_hash)
				: undefined

			function handle_name_change(event: InputEvent) {
				const input = event.target as HTMLInputElement
				context.actions.rename_slot({id: slot.id, name: input.value})
			}

			return html`
				<li class=slot data-id="${slot.id}">
					<input class=name type=text .value="${slot.name}" @change=${handle_name_change}/>
					${glb
						? render_glb(glb)
						: html`<div class="glb empty">empty</div>`}
					<small>${slot.id.slice(0, 8)}</small>
				</li>
			`
		}

		function render_glb(glb: Glb) {
			return html`
				<div class=container>
					<div class=griptape>
						${sprite_tabler_grip_vertical}
						${sprite_tabler_grip_vertical}
						${sprite_tabler_grip_vertical}
					</div>
					<div class="glb assigned">
						<span class=name>${glb.name}</span>
						<ul class=stats>
							<li>
								<span>${human_bytes(glb.size)}</span>
								<span>filesize</span>
							</li>
							<li>
								<span>${glb.container.transformNodes.length}</span>
								<span>transforms</span>
							</li>
							<li>
								<span>${glb.container.meshes.length}</span>
								<span>meshes</span>
							</li>
							<li>
								<span>${glb.container.materials.length}</span>
								<span>materials</span>
							</li>
							<li>
								<span>${glb.container.textures.length}</span>
								<span>textures</span>
							</li>
						</ul>
						<small>${glb.hash.slice(0, 8)}</small>
					</div>
				</div>
			`
		}

		function create() {
			context.actions.add_slot({
				id: generateId(),
				glb_hash: undefined,
				name: "slot",
			})
		}

		return html`
			<ul class=grid>
				${slots.map(render_slot)}
			</ul>
			<button class="based new" @click=${create}>new slot</button>
		`
	}),
})

