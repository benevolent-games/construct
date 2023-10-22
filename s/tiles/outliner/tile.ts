
import {TemplateResult, html} from "@benev/slate"
import {generateId} from "@benev/toolbox/x/utils/generate-id.js"

import {styles} from "./styles.js"
import {tile} from "../tile_parts.js"
import {obsidian} from "../../context/context.js"
import {Item} from "../../context/domains/outline/types.js"
import {sprite_layers} from "../../sprites/groups/feather/layers.js"
import { sprite_plus } from "../../sprites/groups/feather/plus.js"
import { sprite_tabler_folder } from "../../sprites/groups/tabler/folder.js"
import { sprite_tabler_eye } from "../../sprites/groups/tabler/eye.js"
import { make_outline_tools } from "../../context/domains/outline/tools.js"

export const OutlinerTile = tile({
	label: "outliner",
	icon: sprite_layers,
	view: obsidian({name: "outliner", styles}, use => () => {
		const outline = use.watch(() => use.context.state.outline)
		const {actions} = use.context

		const tools = make_outline_tools(outline)

		function click_to_create_new_folder(parent: Item.Folder) {
			return () => {
				const new_id = generateId()
				actions.add_item({
					changes: [{
						folderId: parent.id,
						item: {
							kind: "folder",
							id: new_id,
							name: `new folder ${new_id.slice(0, 5)}`,
							selected: false,
							children: [],
						},
					}],
				})
			}
		}

		function render_gutters(parents: Item.Folder[]) {
			return parents.map(() => html`
				<span class=gutter></span>
			`)
		}

		function render_flat(item: Item.Whatever, parents: Item.Folder[]): TemplateResult {
			switch (item.kind) {
				case "instance": return html`
					<li>
						${render_gutters(parents)}
						<span class=name>${item.name}</span>
					</li>
				`
				case "light": return html`
					<li>
						${render_gutters(parents)}
						<span class=name>${item.name}</span>
					</li>
				`
				case "folder": return html`
					<li>
						${render_gutters(parents)}
						<button class=icon>
							${sprite_tabler_folder}
						</button>
						<span class=name>${item.name}</span>
						<button class=newfolder @click=${click_to_create_new_folder(item)}>
							${sprite_plus}
						</button>
						<button class=visibility>
							${sprite_tabler_eye}
						</button>
					</li>
					${item.children.map(child => render_flat(child, [...parents, item]))}
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

