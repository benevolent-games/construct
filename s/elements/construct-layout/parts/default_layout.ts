
import {Layout} from "./layout.js"

export const default_layout = (): Layout.Cell => ({
	kind: "cell",
	vertical: true,
	size: undefined,
	children: [{
		kind: "pane",
		size: undefined,
		children: [{kind: "leaf"}],
	}],
})

export const default_layout2: () => Layout.Cell = () => ({
	kind: "cell",
	vertical: false,
	size: undefined,

	children: [{
		kind: "cell",
		vertical: true,
		size: 50,
		children: [{
			kind: "pane",
			size: undefined,
			children: [{kind: "leaf"}, {kind: "leaf"}],
		}],
	},

	{
		kind: "cell",
		vertical: true,
		size: 25,
		children: [{
			kind: "pane",
			size: undefined,
			children: [{kind: "leaf"}],
		}],
	},

	{
		kind: "cell",
		vertical: true,
		size: undefined,
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
})

