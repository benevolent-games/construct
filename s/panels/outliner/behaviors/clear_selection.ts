
import {OutlinerMeta} from "../utils/metas.js"

export function clear_selection({tree, tools}: OutlinerMeta, event: MouseEvent) {
	if (tools.selected.length > 0 && event.target === event.currentTarget)
		tree.actions.items.clear_selection()
}

