
import {Layout} from "./layout.js"
import {IdCounter} from "../../../tools/id_counter.js"

export const stock_layouts = {
	empty: cook(ids => ({
		id: ids.pull(),
		kind: "cell",
		vertical: true,
		size: undefined,
		children: [{
			id: ids.pull(),
			kind: "pane",
			size: undefined,
			active_leaf_index: 0,
			children: [{
				id: ids.pull(),
				kind: "leaf",
				tab: "AboutPanel",
			}],
		}],
	})),
	default: cook(ids => ({
		id: ids.pull(),
		kind: "cell",
		vertical: true,
		size: undefined,
		children: [{
			id: ids.pull(),
			kind: "pane",
			size: undefined,
			active_leaf_index: undefined,
			children: [{
				id: ids.pull(),
				kind: "leaf",
				tab: "OutlinerPanel",
			}],
		}],
	})),
}

function cook(make_root: (ids: IdCounter) => Layout.Cell) {
	return (): Layout.File => ({
		version: 0,
		id_count: 0,
		root: make_root(new IdCounter())
	})
}

