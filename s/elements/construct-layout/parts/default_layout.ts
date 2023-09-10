
import {Layout} from "./layout.js"

export const default_layout = (): Layout.Cell => ({
	kind: "cell",
	vertical: true,
	size: undefined,
	children: [{
		kind: "pane",
		size: undefined,
		children: [],
		active_leaf_index: undefined,
	}],
})

