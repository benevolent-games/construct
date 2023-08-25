
import {FlipSetup, GroupProvideRequirement} from "@benev/frog"

import {CellView} from "../views/cell.js"
import {PaneView} from "../views/pane.js"
import {LeafView} from "../views/leaf.js"
import {Context, contextualize} from "../../../context/context.js"

const coreviews = {CellView, PaneView, LeafView}

export type LayoutViews = GroupProvideRequirement<typeof coreviews>

export function layout_views(context: Context): FlipSetup<LayoutViews> {
	return () => ({
		setdown: () => {},
		result: contextualize(context)(coreviews),
	})
}

