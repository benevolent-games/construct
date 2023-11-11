
import {ItemMeta} from "../utils/metas.js"

export function toggle_selection({tree, item, isRoot}: ItemMeta) {
	if (isRoot)
		return
	if (item.selected)
		tree.actions.items.deselect(item.id)
	else
		tree.actions.items.select(item.id)
}

