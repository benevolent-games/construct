
import {ItemMeta} from "../utils/metas.js"

export function toggle_visibility({tree, item}: ItemMeta) {
	if (item.visible)
		tree.actions.items.hide(item.id)
	else
		tree.actions.items.show(item.id)
}

