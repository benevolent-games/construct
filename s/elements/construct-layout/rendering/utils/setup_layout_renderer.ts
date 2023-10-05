
import {requirement} from "@benev/slate"

import {render_cell} from "../cell.js"
import {render_pane} from "../pane.js"
import {render_leaf} from "../leaf.js"
import {LayoutMeta} from "./layout_meta.js"
import {Layout} from "../../parts/layout.js"

export function setup_layout_renderer(
		draft: Omit<LayoutMeta, "render_layout">,
	) {

	const meta: LayoutMeta = {...draft, render_layout}

	const render = requirement.provide(meta)({
		cell: render_cell,
		pane: render_pane,
		leaf: render_leaf,
	})

	function render_layout(node: Layout.Node, path: number[]) {
		switch (node.kind) {
			case "cell": return render.cell(node, path)
			case "pane": return render.pane(node, path)
			case "leaf": return render.leaf(node, path)
			default: throw new Error(`unknown layout node kind`)
		}
	}

	return render_layout
}

