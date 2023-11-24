
import {TemplateResult, html} from "@benev/slate"

import {icon_feather_layers} from "../../icons/groups/feather/layers.js"

import {styles} from "./styles.js"
import {slate} from "../../context/slate.js"
import {PanelProps, panel} from "../panel_parts.js"
import {OutlinerMeta, make_item_meta} from "./utils/metas.js"
import {clear_selection} from "./behaviors/clear_selection.js"
import {LocalFolderStates} from "./utils/local_folder_states.js"
import {create_new_folder} from "./behaviors/create_new_folder.js"
import {GraphReport} from "../../context/domains/outline2/model/model.js"
import {make_outliner_behaviors} from "./utils/make_outliner_behaviors.js"

export const OutlinerPanel = panel({
	label: "outliner",
	icon: icon_feather_layers,
	view: slate.obsidian({name: "outliner", styles},
		use => ({}: PanelProps) => {

		const {edcore, drops, outline2: outline, flowchart} = use.context
		const outlineActions = edcore.actions.outline2
		const folderStates = use.prepare(() => new LocalFolderStates())

		const outlinerMeta: OutlinerMeta = {
			outline,
			flowchart,
			folderStates,
			outlineActions,
			dnd: drops.outliner,
		}

		const behaviors = make_outliner_behaviors(outlinerMeta)

		function render_flat({report}: GraphReport): TemplateResult {
			const isFolder = report.block.childReferences !== null
			const meta = make_item_meta(outlinerMeta, report)
			return html`
				<li>${report.reference.label}</li>
			`
		}

		// function render_flat(report: Item.Report): TemplateResult {
		// 	const meta = make_item_meta(outlinerMeta, report)

		// 	switch (report.item.kind) {
		// 		case "prop":
		// 			return render_instance(meta, behaviors)

		// 		case "light":
		// 			return render_light(meta, behaviors)

		// 		case "container":
		// 			return render_folder(
		// 				meta,
		// 				behaviors,
		// 				childReport => render_flat(childReport),
		// 			)
		// 	}
		// }

		const {graph} = outline

		return html`
			<div>
				<button @click="${() => create_new_folder(outlineActions, null)}">add folder</button>
			</div>
			<ol @click="${(event: MouseEvent) => clear_selection(outlinerMeta, event)}">

				${graph
					.map(render_flat)}
			</ol>
		`
	}),
})

