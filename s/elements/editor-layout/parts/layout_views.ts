
import {RequirementGroupProvided} from "@benev/frog"

import {CellView} from "../views/cell.js"
import {PaneView} from "../views/pane.js"
import {LeafView} from "../views/leaf.js"

export const layout_views = {CellView, PaneView, LeafView}

export type LayoutViews = RequirementGroupProvided<typeof layout_views>

