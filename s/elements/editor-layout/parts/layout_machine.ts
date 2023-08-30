
import {RequirementGroupProvided} from "@benev/frog"

import {Layout} from "./layout.js"
import {CellView} from "../views/cell.js"
import {PaneView} from "../views/pane.js"
import {LeafView} from "../views/leaf.js"
import {default_layout} from "./default_layout.js"

export const layout_views = {CellView, PaneView, LeafView}

export class LayoutMachine {
	root: Layout.Cell = default_layout()

	constructor(
		public views: RequirementGroupProvided<typeof layout_views>,
		public readonly update: () => void,
	) {}
}

