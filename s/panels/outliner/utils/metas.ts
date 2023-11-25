
import {LocalFolderStates} from "./local_folder_states.js"
import {Data} from "../../../context/domains/outline2/data/namespace.js"
import {OutlineActions} from "../../../context/domains/outline2/actions.js"
import {OutlineModel} from "../../../context/domains/outline2/model/model.js"
import {Flowchart} from "../../../context/controllers/flowchart/controller.js"
import {OutlinerDragDrop} from "../../../context/controllers/drop_coordinator/parts/outliner_drag_drop.js"

export type OutlinerMeta = {
	dnd: OutlinerDragDrop
	flowchart: Flowchart
	actions: OutlineActions
	folderStates: LocalFolderStates
	outline: OutlineModel<Data.Concepts>
}

export type ReportMeta = Data.GraphReport & OutlinerMeta

