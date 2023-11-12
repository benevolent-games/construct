
import {ItemMeta} from "../utils/metas.js"

export function delete_item({tree, item}: ItemMeta) {
	tree.actions.outline.delete(item.id)
}

