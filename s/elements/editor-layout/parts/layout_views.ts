
import {FlipSetup, GroupProvideRequirement} from "@benev/frog"

import {CellView} from "../views/cell.js"
import {PaneView} from "../views/pane.js"
import {PlateView} from "../views/plate.js"
import {Context, contextualize} from "../../../context/context.js"

const coreviews = {CellView, PaneView, PlateView}

export type Views = GroupProvideRequirement<typeof coreviews>

export function layout_views(context: Context): FlipSetup<Views> {
	return () => ({
		setdown: () => {},
		result: contextualize(context)(coreviews),
	})
}

