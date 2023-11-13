
import {ItemMeta, OutlinerMeta} from "./metas.js"

export type OutlinerBehaviors = ReturnType<typeof make_outliner_behaviors>

export function make_outliner_behaviors({flowchart}: OutlinerMeta) {
	const normal = flowchart.use("NormalFlow")
	return {
		click_for_item_selections: ({item}: ItemMeta) => normal
			?.selectionClicks.click(item.id)
			?? (() => {})
	}
}

