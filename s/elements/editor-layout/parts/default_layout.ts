
import {Layout} from "./layout.js"

export const default_layout: Layout.Cell = {
	kind: "cell",
	vertical: false,

	children: [{
		kind: "cell",
		vertical: true,
		children: [{
			kind: "pane",
			size: undefined,
			children: [{kind: "leaf"}, {kind: "leaf"}],
		}],
	},

	{
		kind: "cell",
		vertical: true,
		children: [{
			kind: "pane",
			size: undefined,
			children: [{kind: "leaf"}],
		}],
	},

	{
		kind: "cell",
		vertical: true,
		children: [{
			kind: "pane",
			size: 50,
			children: [{kind: "leaf"}],
		},
		{
			kind: "pane",
			size: undefined,
			children: [{kind: "leaf"}],
		}],
	}],
}

