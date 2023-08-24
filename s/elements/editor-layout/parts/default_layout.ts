
import {Layout} from "./layout.js"

export const layout: Layout.Cell = {
	kind: "cell",
	vertical: false,

	children: [{
		kind: "cell",
		vertical: true,
		children: [{
			kind: "pane",
			size: undefined,
			children: [{kind: "plate"}, {kind: "plate"}],
		}],
	},

	{
		kind: "cell",
		vertical: true,
		children: [{
			kind: "pane",
			size: undefined,
			children: [{kind: "plate"}],
		}],
	},

	{
		kind: "cell",
		vertical: true,
		children: [{
			kind: "pane",
			size: 50,
			children: [{kind: "plate"}],
		},
		{
			kind: "pane",
			size: undefined,
			children: [{kind: "plate"}],
		}],
	}],
}

