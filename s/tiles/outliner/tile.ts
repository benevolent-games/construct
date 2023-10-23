
import {TemplateResult, html} from "@benev/slate"
import {generateId} from "@benev/toolbox/x/utils/generate-id.js"

import {styles} from "./styles.js"
import {tile} from "../tile_parts.js"
import {EzMap} from "../../tools/ezmap.js"
import {obsidian} from "../../context/context.js"
import {sprite_x} from "../../sprites/groups/feather/x.js"
import {Id, Item} from "../../context/domains/outline/types.js"
import {sprite_layers} from "../../sprites/groups/feather/layers.js"
import {sprite_tabler_eye} from "../../sprites/groups/tabler/eye.js"
import {sprite_tabler_folder_open} from "../../sprites/groups/tabler/folder-open.js"
import {sprite_tabler_folder_plus} from "../../sprites/groups/tabler/folder-plus.js"
import {sprite_tabler_folder_filled} from "../../sprites/groups/tabler/folder-filled.js"
import {sprite_tabler_vector_triangle} from "../../sprites/groups/tabler/vector-triangle.js"

export const OutlinerTile = tile({
	label: "outliner",
	icon: sprite_layers,
	view: obsidian({name: "outliner", styles}, use => () => {
		const outline = use.watch(() => use.context.state.outline)
		const {actions} = use.context

		const localFolderSettings = use.prepare(() => new EzMap<Id, {opened: boolean}>())

		const drag = use.flatstate({
			item_being_dragged: undefined as undefined | Item.Whatever,
			item_being_hovered_over: undefined as undefined | Item.Whatever,
			mode: "below" as "below" | "into",
		})

		const dnd = use.prepare(() => {
			const stop_dragging = () => {
				drag.item_being_dragged = undefined
				drag.item_being_hovered_over = undefined
			}

			return {
				start: (item: Item.Whatever) => (_event: DragEvent) => {
					drag.item_being_dragged = item
				},
				leave: () => (_event: DragEvent) => {
					drag.item_being_hovered_over = undefined
				},
				end: () => (_event: DragEvent) => {
					stop_dragging()
				},
				into: {
					over: (item: Item.Whatever) => (event: DragEvent) => {
						event.preventDefault()
						drag.item_being_hovered_over = item
						drag.mode = "into"
					},
					drop: (item: Item.Folder) => (_event: DragEvent) => {
						console.log("DROP INTO", drag, item)
						stop_dragging()
					},
				},
				below: {
					over: (item: Item.Whatever) => (event: DragEvent) => {
						event.preventDefault()
						drag.mode = "below"
						drag.item_being_hovered_over = item
					},
					drop: (item: Item.Whatever) => (_event: DragEvent) => {
						console.log("DROP BELOW", drag, item)
						stop_dragging()
					},
				},
			}
		})

		function get_local_folder_settings(id: Id) {
			return localFolderSettings.guarantee(id, () => ({
				opened: true,
			}))
		}

		function click_to_create_new_folder(parent: Item.Folder) {
			return () => {
				const new_id = generateId()
				actions.add_items([{
					folderId: parent.id,
					item: {
						kind: "folder",
						id: new_id,
						name: `folder`,
						selected: false,
						children: [],
					},
				}])
			}
		}

		function render_gutters(parents: Item.Folder[]) {
			return parents.map(() => html`
				<span class=gutter></span>
			`)
		}

		function render_flat(item: Item.Whatever, parents: Item.Folder[]): TemplateResult {
			const is_root = item.id === outline.id

			function render_line_item(content: TemplateResult) {
				const delete_this_item = parents.at(-1)
					? () => actions.delete_items([item.id])
					: undefined
				return html`
					<li
						data-id="${item.id}"
						data-kind="${item.kind}"
						@dragleave=${dnd.leave()}>

						${drag.item_being_dragged ?html`
							<div class=dropzone
								?data-drag-hover="${item.id === drag.item_being_hovered_over?.id}"
								data-drag-mode="${drag.mode}">
								${item.kind === "folder" ? html`
									<div
										class=drop-into
										@dragover=${dnd.into.over(item)}
										@drop=${dnd.into.drop(item)}
									></div>
								` : undefined}
								${!is_root ? html`
									<div
										class=drop-below
										@dragover=${dnd.below.over(item)}
										@drop=${dnd.below.drop(item)}>
									</div>
								` : undefined}
							</div>
						` :undefined}

						${render_gutters(parents)}
						${content}
						${delete_this_item
							? html`
								<button class=delete @click=${delete_this_item}>
									${sprite_x}
								</button>
							`
							: html`
								<div class=spacer></div>
							`}
					</li>
				`
			}

			function render_id() {
				return html`
					<div class=id>
						${item.id.slice(0, 6)}
					</div>
				`
			}

			function draggable(content: TemplateResult) {
				return is_root ? content : html`
					<div
						draggable=true
						@dragstart=${dnd.start(item)}
						@dragend=${dnd.end()}>
						${content}
					</div>
				`
			}

			function render_nonfolder_right_side() {
				return html`
					${render_id()}
					<div class=spacer></div>
					<button class=visibility>
						${sprite_tabler_eye}
					</button>
				`
			}

			switch (item.kind) {
				case "instance":
					return render_line_item(html`
						${draggable(html`
							<button class=icon>
								${sprite_tabler_vector_triangle}
							</button>
							<div class=name>${item.name}</div>
						`)}
						${render_nonfolder_right_side()}
					`)
				case "light":
					return render_line_item(html`
						${draggable(html`
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
					return html`
						${render_line_item(html`
							${draggable(html`
								<button class=icon @click=${toggle_opened}>
									${settings.opened
										? sprite_tabler_folder_open
										: sprite_tabler_folder_filled}
								</button>
								<div class=name @click=${toggle_opened}>${item.name}</div>
							`)}
							${render_id()}
							<button class=newfolder @click=${click_to_create_new_folder(item)}>
								${sprite_tabler_folder_plus}
							</button>
							<button class=visibility>
								${sprite_tabler_eye}
							</button>
						`)}
						${settings.opened
							? item.children.map(child => render_flat(child, [...parents, item]))
							: undefined}
					`
			}
		}

		return html`
			<ol>
				${render_flat(outline, [])}
			</ol>
		`
	}),
})

