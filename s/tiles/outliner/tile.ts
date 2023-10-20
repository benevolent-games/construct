
import {TemplateResult, html} from "@benev/slate"

import {styles} from "./styles.js"
import {tile} from "../tile_parts.js"
import {obsidian} from "../../context/context.js"
import {sprite_folder} from "../../sprites/groups/feather/folder.js"
import {Item} from "../../context/controllers/graphliner/graphliner.js"
import { generateId } from "@benev/toolbox/x/utils/generate-id.js"

export const OutlinerTile = tile({
	label: "outliner",
	icon: sprite_folder,
	view: obsidian({name: "outliner", styles}, use => () => {
		const {graphliner} = use.context

		function render_item(item: Item.Whatever): TemplateResult {
			switch (item.kind) {

				case "folder": return html`
					<li>
						<button class=icon>[folder]</button>
						<span class=name>${item.name}</span>
						<button class=newfolder @click=${() => {
							graphliner.add(item, {
								kind: "folder",
								name: `new folder ${generateId().slice(0, 5)}`,
								selected: false,
							})
						}}>+</button>
						<ol>
							${item.children.map(item => render_item(item))}
						</ol>
					</li>
				`

				case "instance": return html`
					<li>
						<span class=name>${item.name}</span>
					</li>
				`

				case "light": return html`
					<li>
						<span class=name>${item.name}</span>
					</li>
				`

				default:
					throw new Error(`unknown item kind "${(item as any).kind}"`)
			}
		}

		return html`
			<ol>
				${render_item(graphliner.root)}
			</ol>
		`
	}),
})

