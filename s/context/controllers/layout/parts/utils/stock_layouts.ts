
import {Layout} from "../types.js"
import {freshId} from "../../../../../tools/fresh_id.js"

export const stock_layouts = {
	empty: (): Layout.Cell => ({
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
	}),
}

