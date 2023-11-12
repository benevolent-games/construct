
import {OutlinerMeta} from "../utils/metas.js"

export function clear_selection({tree, outline}: OutlinerMeta, event: MouseEvent) {
	if (outline.selected.length > 0 && event.target === event.currentTarget)
		tree.actions.outline.clear_selection()
}

