
import {ItemMeta} from "../utils/metas.js"

export function toggle_selection({tree, item, isRoot}: ItemMeta) {
	if (isRoot)
		return
	if (item.selected)
		tree.actions.outline.deselect(item.id)
	else
		tree.actions.outline.select(item.id)
}

