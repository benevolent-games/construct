
import {TemplateResult, html} from "@benev/slate"
import {generateId} from "@benev/toolbox/x/utils/generate-id.js"

import {styles} from "./styles.js"
import {tile} from "../tile_parts.js"
import {EzMap} from "../../tools/ezmap.js"
import {obsidian} from "../../context/context.js"
import {sprite_x} from "../../sprites/groups/feather/x.js"
import {Id, Item} from "../../context/domains/outline/types.js"
import {sprite_plus} from "../../sprites/groups/feather/plus.js"
import {sprite_layers} from "../../sprites/groups/feather/layers.js"
import {sprite_tabler_eye} from "../../sprites/groups/tabler/eye.js"
import {sprite_tabler_folder} from "../../sprites/groups/tabler/folder.js"
import {sprite_tabler_folder_filled} from "../../sprites/groups/tabler/folder-filled.js"
import { sprite_tabler_vector_triangle } from "../../sprites/groups/tabler/vector-triangle.js"
import { sprite_tabler_folder_plus } from "../../sprites/groups/tabler/folder-plus.js"

export const OutlinerTile = tile({
	label: "outliner",
	icon: sprite_layers,
	view: obsidian({name: "outliner", styles}, use => () => {
		const outline = use.watch(() => use.context.state.outline)
		const {actions} = use.context

		const localFolderSettings = use.prepare(() => new EzMap<Id, {opened: boolean}>())
		// const tools = make_outline_tools(outline)

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
			function render_line_item(content: TemplateResult) {
				const delete_this_item = parents.at(-1)
					? () => actions.delete_items([item.id])
					: undefined
				return html`
					<li data-kind="${item.kind}">
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
						<button class=icon>
							${sprite_tabler_vector_triangle}
						</button>
						<div class=name>${item.name}</div>
						${render_nonfolder_right_side()}
					`)
				case "light":
					return render_line_item(html`
						<div class=name>${item.name}</div>
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
							<button class=icon @click=${toggle_opened}>
								${settings.opened ?sprite_tabler_folder_filled :sprite_tabler_folder}
							</button>

							<div class=name @click=${toggle_opened}>${item.name}</div>

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

