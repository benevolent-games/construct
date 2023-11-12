
import {ItemMeta} from "../utils/metas.js"

export function toggle_selection({edcore, item, isRoot}: ItemMeta) {
	if (isRoot)
		return
	if (item.selected)
		edcore.actions.outline.deselect(item.id)
	else
		edcore.actions.outline.select(item.id)
}

