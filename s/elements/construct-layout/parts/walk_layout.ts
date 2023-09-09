
import {Layout} from "./layout.js"

export type WalkMission<T> = {
	cell: (cell: Layout.Cell, path: number[]) => T
	pane: (pane: Layout.Pane, path: number[]) => T
	leaf: (leaf: Layout.Leaf, path: number[]) => T
}

export function walk_layout<T>(node: Layout.Node, mission: WalkMission<T>) {
	function recurse(node: Layout.Node, path: number[] = []): T {
		switch (node.kind) {
			case "cell": return mission.cell(node, path)
			case "pane": return mission.pane(node, path)
			case "leaf": return mission.leaf(node, path)
		}
	}
	return recurse(node)
}

