
import {LocalFolderStates} from "./local_folder_states.js"
import {Item} from "../../../context/domains/outline2/types/item.js"
import {OutlineModel} from "../../../context/domains/outline2/model.js"
import {OutlineActions} from "../../../context/domains/outline2/actions.js"
import {Flowchart} from "../../../context/controllers/flowchart/controller.js"
import {OutlinerDragDrop} from "../../../context/controllers/drop_coordinator/parts/outliner_drag_drop.js"

export type OutlinerMeta = {
	dnd: OutlinerDragDrop
	outline: OutlineModel
	flowchart: Flowchart
	outlineActions: OutlineActions
	folderStates: LocalFolderStates
}

export type ItemMeta = Item.Report & OutlinerMeta

export function make_item_meta(
		outlinerMeta: OutlinerMeta,
		report: Item.Report
	): ItemMeta {

	return {
		...outlinerMeta,
		...report,
	}
}

