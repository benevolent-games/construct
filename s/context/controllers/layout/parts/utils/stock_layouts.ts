
import {Layout} from "../types.js"
import {generateId} from "@benev/toolbox/x/utils/generate-id.js"

export const stock_layouts = {
	empty: (): Layout.Cell => ({
		id: generateId(),
		kind: "cell",
		size: null,
		vertical: true,
		children: [{
			id: generateId(),
			kind: "pane",
			size: null,
			active_leaf_index: 0,
			children: [{
				id: generateId(),
				kind: "leaf",
				panel: "AboutPanel",
			}],
		}],
	}),
}

