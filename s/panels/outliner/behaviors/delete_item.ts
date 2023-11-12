
import {ItemMeta} from "../utils/metas.js"

export function delete_item({edcore, item}: ItemMeta) {
	edcore.actions.outline.delete(item.id)
}

