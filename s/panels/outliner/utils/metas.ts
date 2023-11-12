
import {LocalFolderStates} from "./local_folder_states.js"
import {Item} from "../../../context/domains/outline/types.js"
import { Edcore } from "../../../context/controllers/edcore/controller.js"
import {OutlineGenius} from "../../../context/controllers/outline_genius/controller.js"
import {OutlinerDrops} from "../../../context/controllers/drop_coordinator/parts/outliner_drops.js"

export type OutlinerMeta = {
	edcore: Edcore
	drops: OutlinerDrops
	outline: OutlineGenius
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
		isRoot: item.id === outlinerMeta.outline.root.id,
	}
}

