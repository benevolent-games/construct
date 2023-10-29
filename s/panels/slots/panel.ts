
import {html} from "lit"
import {generateId} from "@benev/toolbox/x/utils/generate-id.js"

import {styles} from "./styles.js"
import {slate} from "../../context/slate.js"
import {GlbSlot} from "../../context/state.js"
import {PanelProps, panel} from "../panel_parts.js"
import {human_bytes} from "../../tools/human_bytes.js"
import {sprite_x} from "../../sprites/groups/feather/x.js"
import {Item} from "../../context/domains/outline/types.js"
import {Glb} from "../../context/controllers/warehouse/parts/types.js"
import {useDragAndDrop} from "../../tools/shockdrop/use_drag_and_drop.js"
import {drag_has_files} from "../../tools/shockdrop/utils/drag_has_files.js"
import {sprite_tabler_layout_list} from "../../sprites/groups/tabler/layout-list.js"
import {sprite_tabler_grip_vertical} from "../../sprites/groups/tabler/grip-vertical.js"

export const SlotsPanel = panel({
	label: "slots",
	icon: sprite_tabler_layout_list,
	view: slate.obsidian({name: "slots", styles}, use => ({}: PanelProps) => {
		const {context} = use
		const slots = use.watch(() => context.state.slots)

		const drag = useDragAndDrop<GlbSlot, GlbSlot>({
			use,
			handle_drop: (_, slotA, slotB) => {
				if (slotA !== slotB)
					context.actions.swap_slots([slotA.id, slotB.id])
			},
			out_of_band: {
				predicate: drag_has_files,
				handle_drop: (event, slot) => {
					const [file, ...files] = Array.from(event.dataTransfer!.files)
					context.warehouse.add_glb_file(file, slot.id)
					for (const file of files)
						context.warehouse.add_glb_file(file)
					event.preventDefault()
					event.stopPropagation()
					context.on_file_drop_already_handled_internally.publish()
				},
			},
		})

		function render_id(id: Item.Id) {
			return html`
				<small class=id>${id.slice(0, 8)}</small>
			`
		}

		function render_slot(slot: GlbSlot) {
			const glb = slot.glb_hash
				? context.warehouse.get_glb(slot.glb_hash)
				: undefined

			const is_picked_up = drag.payload === slot
			const is_hovered_over = !is_picked_up && drag.hover === slot

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
						draggable="${(status === 'assigned') ? 'true' : 'false'}"
						?data-drag-is-picked-up=${is_picked_up}
						?data-drag-is-hovered-over=${is_hovered_over}
						@dragstart=${drag.dragstart(slot)}
						@dragend=${drag.dragend()}
						@dragenter=${drag.dragenter()}
						@dragover=${drag.dragover(slot)}
						@dragleave=${drag.dragleave()}
						@drop=${drag.drop(slot)}
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

