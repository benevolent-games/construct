
import {OutlinerMeta} from "../utils/metas.js"

export function clear_selection({edcore, outline}: OutlinerMeta, event: MouseEvent) {
	if (outline.selected.length > 0 && event.target === event.currentTarget)
		edcore.actions.outline.clear_selection()
}

