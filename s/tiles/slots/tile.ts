
import {html} from "lit"

import {styles} from "./styles.js"
import {tile} from "../tile_parts.js"
import {dragonFileInterceptor, useDragon} from "./dragon/dragon.js"
import {GlbSlot} from "../../context/state.js"
import {obsidian} from "../../context/context.js"
import {human_bytes} from "../../tools/human_bytes.js"
import {Id} from "../../context/domains/outline/types.js"
import {sprite_x} from "../../sprites/groups/feather/x.js"
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

		const dragon = useDragon<GlbSlot, GlbSlot>(use, (slotA, slotB) => {
			if (slotA !== slotB)
				context.actions.swap_slots([slotA.id, slotB.id])
		})

		const fileDragon = dragonFileInterceptor(use, dragon)

		function render_id(id: Id) {
			return html`
				<small class=id>${id.slice(0, 8)}</small>
			`
		}

		function render_slot(slot: GlbSlot) {
			const glb = slot.glb_hash
				? context.warehouse.get_glb(slot.glb_hash)
				: undefined

			const is_picked_up = dragon.payload === slot
			const is_hovered_over = (
				dragon.payload &&
				(!is_picked_up && dragon.hover === slot)
			)

			const status = (glb && !is_picked_up)
				? "assigned"
				: "empty"

			function handle_name_change(event: InputEvent) {
				const input = event.target as HTMLInputElement
				context.actions.rename_slot({id: slot.id, name: input.value})
			}

			function delete_slot() {
				context.actions.delete_slot(slot)
			}

			return html`
				<li class=slot data-id="${slot.id}">
					<div class="top bar">
						<input
							class=name
							type=text
							.value="${slot.name}"
							@change=${handle_name_change}/>
						<button class=delete @click=${delete_slot}>
							${sprite_x}
						</button>
					</div>
					<div
						class=glb
						data-status=${status}
						draggable="true"
						?data-drag-is-picked-up=${is_picked_up}
						?data-drag-is-hovered-over=${is_hovered_over}
						@dragstart=${fileDragon.start(slot)}
						@dragend=${fileDragon.end()}
						@dragover=${fileDragon.over(slot)}
						@dragleave=${dragon.leave()}
						@drop=${dragon.drop(slot)}
						>
						${status === "assigned"
							? render_glb(slot, glb!)
							: html`<span>empty</span>`}
					</div>
					<div class="bottom bar">
						${render_id(slot.id)}
					</div>
				</li>
			`
		}

		function render_glb(slot: GlbSlot, glb: Glb) {
			function delete_glb() {
				context.actions.set_slot_glb({id: slot.id, glb_hash: undefined})
			}
			return html`
				<div class="cap grip">
					${sprite_tabler_grip_vertical}
				</div>
				<div class=plate>
					<div class=heading>
						<span>${glb.name}</span>
						${render_id(glb.hash)}
					</div>
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
				</div>
				<div class="cap deleter">
					<button class=delete @click=${delete_glb}>
						${sprite_x}
					</button>
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
			<div class=buttons>
				<button class="based new" @click=${create}>new slot</button>
			</div>
		`
	}),
})

