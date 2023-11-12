
import {ItemMeta} from "../utils/metas.js"

export function toggle_visibility({edcore, item}: ItemMeta) {
	if (item.visible)
		edcore.actions.outline.hide(item.id)
	else
		edcore.actions.outline.show(item.id)
}

