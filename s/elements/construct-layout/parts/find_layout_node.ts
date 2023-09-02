
import {Layout} from "./layout.js"

export function find_layout_node<N extends Layout.Node>(
		layout: Layout.Cell,
		path: number[],
	) {

	let node: any = layout

	for (const index of path)
		node = node?.children
			? node.children.at(index)
			: undefined

	if (node)
		return node as N

	else
		throw new Error("invalid path")
}

