
import {Layout} from "./parts/types.js"
import {freshId} from "../../../tools/fresh_id.js"
import {StockLayouts} from "./parts/utils/stock_layouts.js"

const layout_empty = (): Layout.Cell => ({
	id: freshId(),
	kind: "cell",
	size: null,
	vertical: true,
	children: [{
		id: freshId(),
		kind: "pane",
		size: null,
		active_leaf_index: 0,
		children: [{
			id: freshId(),
			kind: "leaf",
			panel: "AboutPanel",
		}],
	}],
})

export const game_editor_layouts = {
	empty: layout_empty,
	default: layout_empty,
} satisfies StockLayouts

