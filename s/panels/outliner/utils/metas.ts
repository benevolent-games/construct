
import {LocalFolderStates} from "./local_folder_states.js"
import {Item} from "../../../context/domains/outline/types.js"
import {Tree} from "../../../context/controllers/tree/controller.js"
import {OutlineState, OutlineTools} from "../../../context/domains/outline/tools.js"
import {OutlinerDrops} from "../../../context/controllers/drop_coordinator/parts/outliner_drops.js"

export type OutlinerMeta = {
	tree: Tree
	tools: OutlineTools
	drops: OutlinerDrops
	outline: OutlineState
	folderStates: LocalFolderStates
}

export type ItemMeta = {
	item: Item.Whatever
	parents: Item.Folder[]
	isRoot: boolean
} & OutlinerMeta

export function make_item_meta(
		outlinerMeta: OutlinerMeta,
		item: Item.Whatever,
		parents: Item.Folder[],
	) {

	return {
		...outlinerMeta,
		item,
		parents,
		isRoot: item.id === outlinerMeta.outline.id,
	}
}

