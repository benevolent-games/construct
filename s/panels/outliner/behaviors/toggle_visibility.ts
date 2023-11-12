
import {ItemMeta} from "../utils/metas.js"

export function toggle_visibility({tree, item}: ItemMeta) {
	if (item.visible)
		tree.actions.outline.hide(item.id)
	else
		tree.actions.outline.show(item.id)
}

