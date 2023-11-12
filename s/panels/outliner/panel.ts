
import {TemplateResult, html} from "@benev/slate"

import {icon_feather_layers} from "../../icons/groups/feather/layers.js"

import {styles} from "./styles.js"
import {slate} from "../../context/slate.js"
import {render_light} from "./render/light.js"
import {render_folder} from "./render/folder.js"
import {PanelProps, panel} from "../panel_parts.js"
import {render_instance} from "./render/instance.js"
import {Item} from "../../context/domains/outline/types.js"
import {OutlinerMeta, make_item_meta} from "./utils/metas.js"
import {clear_selection} from "./behaviors/clear_selection.js"
import {LocalFolderStates} from "./utils/local_folder_states.js"

export const OutlinerPanel = panel({
	label: "outliner",
	icon: icon_feather_layers,
	view: slate.obsidian({name: "outliner", styles},
		use => ({}: PanelProps) => {

		const {edcore, drops, outline} = use.context
		const folderStates = use.prepare(() => new LocalFolderStates())

		const outlinerMeta: OutlinerMeta = {
			edcore,
			outline,
			folderStates,
			drops: drops.outliner,
		}

		function render_flat(
				item: Item.Whatever,
				parents: Item.Folder[],
			): TemplateResult {

			const meta = make_item_meta(outlinerMeta, item, parents)

			switch (item.kind) {
				case "instance":
					return render_instance(meta)

				case "light":
					return render_light(meta)

				case "folder":
					return render_folder(
						meta,
						child => render_flat(child, [...parents, item]),
					)
			}
		}

		return html`
			<ol @click="${(event: MouseEvent) => clear_selection(outlinerMeta, event)}">
				${render_flat(outline.root, [])}
			</ol>
		`
	}),
})

