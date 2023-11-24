
import {ItemMeta} from "../utils/metas.js"

export function toggle_visibility({item, outlineActions}: ItemMeta) {
	if (item.visible)
		outlineActions.visibility.hide(item.id)
	else
		outlineActions.visibility.show(item.id)
}

