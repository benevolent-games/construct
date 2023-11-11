
import {html} from "lit"

import {icon_feather_x} from "../../icons/groups/feather/x.js"
import {icon_tabler_layout_list} from "../../icons/groups/tabler/layout-list.js"
import {icon_tabler_grip_vertical} from "../../icons/groups/tabler/grip-vertical.js"

import {styles} from "./styles.js"
import {slate} from "../../context/slate.js"
import {GlbSlot} from "../../context/state.js"
import {Id, freshId} from "../../tools/fresh_id.js"
import {PanelProps, panel} from "../panel_parts.js"
import {human_bytes} from "../../tools/human_bytes.js"
import {Glb} from "../../context/controllers/world/warehouse/parts/types.js"

export const SlotsPanel = panel({
	label: "slots",
	icon: icon_tabler_layout_list,
	view: slate.obsidian({name: "slots", styles}, use => ({}: PanelProps) => {
		const {tree, drops, world: {warehouse}} = use.context
		const slots = use.watch(() => tree.state.slots)
		const dnd = drops.slots

		function render_id(id: Id) {
			return html`
				<small class=id>${id.slice(0, 8)}</small>
			`
		}

		function render_slot(slot: GlbSlot) {
			const glb = slot.glb_hash
				? warehouse.get_glb(slot.glb_hash)
				: null

			const is_picked_up = dnd.grabbed?.id === slot.id
			const is_hovered_over = !is_picked_up && dnd.hovering?.id === slot.id

			const status = (glb && !is_picked_up)
				? "assigned"
				: "empty"

			const draggable = status === "assigned"
				? "true" // intentionally strings
				: "false"

			function handle_name_change(event: InputEvent) {
				const input = event.target as HTMLInputElement
				tree.actions.slots.rename(slot.id, input.value)
			}

			function delete_slot() {
				tree.actions.slots.delete(slot.id)
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
							${icon_feather_x}
						</button>
					</div>
					<div
						class=glb
						data-status=${status}
						?data-drag-is-picked-up=${is_picked_up}
						?data-drag-is-hovered-over=${is_hovered_over}
						draggable="${draggable}"
						@dragstart=${dnd.dragzone.dragstart(slot)}
						@dragend=${dnd.dragzone.dragend()}
						@dragenter=${dnd.dropzone.dragenter()}
						@dragleave=${dnd.dropzone.dragleave()}
						@dragover=${dnd.dropzone.dragover(slot)}
						@drop=${dnd.dropzone.drop(slot)}
						>

						${status === "assigned"
							? render_glb(slot, glb!)
							: slot.glb_hash
								? html`<span>missing glb ${slot.glb_hash.slice(0, 8)}</span>`
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
				tree.actions.slots.assign_glb(slot.id, null)
			}
			return html`
				<div class="cap grip">
					${icon_tabler_grip_vertical}
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
						${icon_feather_x}
					</button>
				</div>
			`
		}

		function create() {
			tree.actions.slots.add({
				id: freshId(),
				glb_hash: null,
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

