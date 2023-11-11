
import {ItemMeta} from "../utils/metas.js"

export function delete_item({tree, item}: ItemMeta) {
	tree.actions.items.delete(item.id)
}

