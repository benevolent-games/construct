
import {TemplateResult, html} from "@benev/slate"

import {icon_feather_x} from "../../icons/groups/feather/x.js"
import {icon_tabler_eye} from "../../icons/groups/tabler/eye.js"
import {icon_feather_layers} from "../../icons/groups/feather/layers.js"
import {icon_tabler_eye_closed} from "../../icons/groups/tabler/eye-closed.js"
import {icon_tabler_folder_open} from "../../icons/groups/tabler/folder-open.js"
import {icon_tabler_folder_plus} from "../../icons/groups/tabler/folder-plus.js"
import {icon_tabler_folder_filled} from "../../icons/groups/tabler/folder-filled.js"
import {icon_tabler_vector_triangle} from "../../icons/groups/tabler/vector-triangle.js"

import {styles} from "./styles.js"
import {EzMap} from "../../tools/ezmap.js"
import {slate} from "../../context/slate.js"
import {Id, freshId} from "../../tools/fresh_id.js"
import {PanelProps, panel} from "../panel_parts.js"
import {shock_drag_and_drop} from "../../common.js"
import {Item} from "../../context/domains/outline/types.js"
import {make_outline_tools} from "../../context/domains/outline/tools.js"

export const OutlinerPanel = panel({
	label: "outliner",
	icon: icon_feather_layers,
	view: slate.obsidian({name: "outliner", styles},
		use => ({}: PanelProps) => {

		const {tree} = use.context
		const outline = use.watch(() => tree.state.outline)

		const tools = make_outline_tools(outline)
		const localFolderSettings = use.prepare(() => new EzMap<Id, {opened: boolean}>())

		type Grabbed = {itemId: Id}
		type HoveringInto = {mode: "into", folderId: Id}
		type HoveringBelow = {mode: "below", itemId: Id}
		type Hovering = HoveringInto | HoveringBelow

		const dnd = use.prepare(() => shock_drag_and_drop<Grabbed, Hovering>({
			handle_drop: (_event, grabbed, hovering) => {
				const itemId = grabbed!.itemId
				if (hovering.mode === "into")
					tree.actions.items.move_into_folder({
						itemIds: [itemId],
						folderId: hovering.folderId,
					})
				else
					tree.actions.items.move_below_another_item({
						itemIds: [itemId],
						targetItemId: hovering.itemId,
					})
			},
		}))

		function get_local_folder_settings(id: Id) {
			return localFolderSettings.guarantee(id, () => ({
				opened: true,
			}))
		}

		function click_to_create_new_folder(parent: Item.Folder) {
			return () => {
				const new_id = freshId()
				tree.actions.items.add([{
					folderId: parent.id,
					item: {
						kind: "folder",
						id: new_id,
						name: `folder`,
						selected: false,
						visible: true,
						children: [],
					},
				}])
			}
		}

		function render_gutters(parents: Item.Folder[]) {
			return html`
				<div class=gutter-group>
					${parents.map(() => html`
						<span class=gutter></span>
					`)}
				</div>
			`
		}

		// const augmented = {
		// 	into: {
		// 		dragover: (mode: DragHoverMode) => (hovering: Hovering) => (event: DragEvent) => {
		// 			hovering.mode = mode
		// 			dnd.dropzone.dragover(hovering)(event)
		// 		},
		// 		drop: (mode: DragHoverMode) => (hovering: Hovering) => (event: DragEvent) => {
		// 			if (hovering)
		// 		},
		// 	},
		// }

		function render_flat(item: Item.Whatever, parents: Item.Folder[]): TemplateResult {
			const is_root = item.id === outline.id

			function render_line_item(content: TemplateResult) {
				const delete_this_item = parents.at(-1)
					? () => tree.actions.items.delete(item.id)
					: undefined

				const itemId = item.id
				const hovering_into: Hovering = {mode: "into", folderId: item.id}
				const hovering_below: Hovering = {itemId, mode: "below"}

				const is_hovering_over = (dnd.hovering && (
					dnd.hovering.mode === "into"
						? dnd.hovering.folderId === itemId
						: dnd.hovering.itemId === itemId
				))

				return html`
					<li
						data-id="${item.id}"
						data-kind="${item.kind}"
						?data-visible="${item.visible}"
						?data-not-apparent="${!tools.isApparent(item.id)}"
						?data-selected="${item.selected}"
						@dragleave=${dnd.dropzone.dragleave()}>

						${dnd.grabbed ?html`
							<div class=dropzone
								?data-drag-hover="${is_hovering_over}"
								data-drag-mode="${dnd.hovering?.mode}">
								${item.kind === "folder" ? html`
									<div
										class=drop-into
										@dragover=${dnd.dropzone.dragover(hovering_into)}
										@drop=${dnd.dropzone.drop(hovering_into)}
									></div>
								` : undefined}
								${!is_root ? html`
									<div
										class=drop-below
										@dragover=${dnd.dropzone.dragover(hovering_below)}
										@drop=${dnd.dropzone.drop(hovering_below)}
									></div>
								` : undefined}
							</div>
						` :undefined}

						${render_gutters(parents)}
						${content}
						${delete_this_item
							? html`
								<button class=delete @click=${delete_this_item}>
									${icon_feather_x}
								</button>
							`
							: html`
								<div class=spacer></div>
							`}
					</li>
				`
			}

			function render_id(onclick = () => {}) {
				return html`
					<div class=id data-unnecessary @click=${onclick}>
						${item.id.slice(0, 6)}
					</div>
				`
			}

			function toggle_visibility() {
				if (item.visible)
					tree.actions.items.hide(item.id)
				else
					tree.actions.items.show(item.id)
			}

			function render_visibility() {
				return html`
					<button
						class=visibility
						?data-visible="${item.visible}"
						@click="${toggle_visibility}">
							${item.visible
								? icon_tabler_eye
								: icon_tabler_eye_closed}
					</button>
				`
			}

			function gripbox(content: TemplateResult) {
				return is_root ? html`
					<div class=gripbox>
						${content}
					</div>
				` : html`
					<div
						class=gripbox
						draggable=true
						@dragstart=${dnd.dragzone.dragstart({itemId: item.id})}
						@dragend=${dnd.dragzone.dragend()}>
						${content}
					</div>
				`
			}

			function render_nonfolder_right_side() {
				return html`
					${render_id()}
					<div class=spacer></div>
					${render_visibility()}
				`
			}

			function toggleSelection() {
				if (is_root)
					return

				if (item.selected)
					tree.actions.items.deselect(item.id)
				else
					tree.actions.items.select(item.id)
			}

			switch (item.kind) {
				case "instance":
					return render_line_item(html`
						${gripbox(html`
							<div class=icon @click="${toggleSelection}">
								${icon_tabler_vector_triangle}
							</div>
							<div class=name @click="${toggleSelection}">${item.name}</div>
						`)}
						${render_nonfolder_right_side()}
					`)
				case "light":
					return render_line_item(html`
						${gripbox(html`
							<div class=name>${item.name}</div>
						`)}
						${render_nonfolder_right_side()}
					`)
				case "folder":
					const settings = get_local_folder_settings(item.id)

					const toggle_opened = () => {
						settings.opened = !settings.opened
						use.rerender()
					}

					const number_of_children = tools.reports.reduce(
						(previous, current) =>
							previous + (current.parents.map(p => p.id)
								.includes(item.id) ? 1 : 0), 0
					)

					return html`
						${render_line_item(html`
							${gripbox(html`
								<button @click=${toggle_opened}>
									${settings.opened
										? icon_tabler_folder_open
										: icon_tabler_folder_filled}
								</button>
								<div
									class=name
									@click=${toggleSelection}>
										${item.name}
								</div>
							`)}

							<div
								class=childcount
								data-unnecessary
								@click=${toggleSelection}>
									${number_of_children}
							</div>

							${render_id(toggle_opened)}

							<button
								class=newfolder
								@click=${click_to_create_new_folder(item)}>
									${icon_tabler_folder_plus}
							</button>

							${render_visibility()}
						`)}

						${settings.opened
							? item.children.map(child => render_flat(child, [...parents, item]))
							: undefined}
					`
			}
		}

		function clearSelection(event: MouseEvent) {
			if (tools.selected.length > 0 && event.target === event.currentTarget)
				tree.actions.items.clear_selection()
		}

		return html`
			<ol @click="${clearSelection}">
				${render_flat(outline, [])}
			</ol>
		`
	}),
})

