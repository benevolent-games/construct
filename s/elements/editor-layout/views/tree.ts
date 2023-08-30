
import {css} from "lit"

import {view} from "../../frontend.js"
import {LayoutMachine} from "../parts/layout_machine.js"
import {recursively_render_layout} from "../parts/recursively_render_layout.js"

export const TreeView = view({
		name: "tree",
		views: {},
		styles: css`
			:host {
				display: flex;
				width: 100%;
				height: 100%;
			}
		`,
	}).render(_context => _views => _use => (machine: LayoutMachine) => {

	return recursively_render_layout(machine, machine.root)
})

