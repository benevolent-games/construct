
import {OutlinerMeta} from "../utils/metas.js"

export function clear_selection(
		{outline, outlineActions}: OutlinerMeta,
		event: MouseEvent,
	) {

	if (outline.selected.length > 0 && event.target === event.currentTarget)
		outlineActions.selection.clear()
}

