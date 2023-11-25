
import {TemplateResult, html} from "@benev/slate"

import {icon_feather_layers} from "../../icons/groups/feather/layers.js"

import {styles} from "./styles.js"
import {slate} from "../../context/slate.js"
import {PanelProps, panel} from "../panel_parts.js"
import {ReportMeta, OutlinerMeta} from "./utils/metas.js"
import {icon_feather_x} from "../../icons/groups/feather/x.js"
import {LocalFolderStates} from "./utils/local_folder_states.js"
import {Data} from "../../context/domains/outline2/data/namespace.js"
import {OutlineModel} from "../../context/domains/outline2/model/model.js"
import {icon_tabler_folder_plus} from "../../icons/groups/tabler/folder-plus.js"
// import {clear_selection} from "./behaviors/clear_selection.js"
// import {LocalFolderStates} from "./utils/local_folder_states.js"
// import {create_new_folder} from "./behaviors/create_new_folder.js"
// import {GraphReport} from "../../context/domains/outline2/model/model.js"
// import {make_outliner_behaviors} from "./utils/make_outliner_behaviors.js"

export const OutlinerPanel = panel({
	label: "outliner",
	icon: icon_feather_layers,
	view: slate.obsidian({name: "outliner", styles},
		use => ({}: PanelProps) => {

		const {edcore, drops, outline2: outline, flowchart} = use.context
		const {graph} = outline
		const actions = edcore.actions.outline2
		const folderStates = use.prepare(() => new LocalFolderStates())

		const outlinerMeta: OutlinerMeta = {
			outline: outline as unknown as OutlineModel<Data.Concepts>,
			actions,
			flowchart,
			folderStates,
			dnd: drops.outliner,
		}

		// const behaviors = make_outliner_behaviors(outlinerMeta)

		function render_flat(report: Data.GraphReport): TemplateResult {
			const is_container = report.block.childReferences !== null
			const meta: ReportMeta = {...outlinerMeta, ...report}

			// TODO extensible rendering.
			// just like editor data.
			// the outline panel should render only blocks and references purely,
			// and then use config to do special rendering for specific types.
			// or maybe even create a new thing on the context
			// that harbors special renderers for each editor concept..

			function render_folder() {
				const {block, reference, otherReferences} = report
				const is_prefab = otherReferences.length > 0
				return html`
					<li>${report.reference.name} ${is_prefab ? "prefab" : "folder"}</li>
				`
			}

			function render_prop() {
				return html`<li>prop</li>`
			}

			function render_light() {
				return html`<li>light</li>`
			}

			switch (report.block.kind) {
				case "prop":
					return render_prop()
				case "light":
					return render_light()
				case "folder":
					return render_folder()
				default:
					return html`<li>unknown "${report.block.kind}"</li>`
			}
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


		function create_new_folder() {
			actions.core.make_new_folder({
				name: "new folder",
				parentBlockId: null,
			})
		}

		function clear_selection() {
			console.log("clear selection??")
		}

		function render_header() {
			const {isolation_report} = outline
			return html`
				<header>
					${isolation_report ? html`
						<div class=isolation>
							<button class=delete>
								${icon_feather_x}
							</button>
							<span>
								${isolation_report.reference.name}
							</span>
						</div>
					` : null}
					<div class=buttonbar>
						<button @click="${create_new_folder}">
							${icon_tabler_folder_plus}
						</button>
					</div>
				</header>
			`
		}

		return html`
			${render_header()}
			<ol @click="${clear_selection}">
				${graph.map(render_flat)}
			</ol>
		`
	}),
})

