
import {ItemMeta} from "../utils/metas.js"

export function delete_item({item, outlineActions}: ItemMeta) {
	outlineActions.items.delete(item.id)
}

