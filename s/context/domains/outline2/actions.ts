
import {ZipAction} from "@benev/slate"

import {State} from "../../state.js"
import {outline_item_actions} from "./actions/items.js"
import {outline_moving_actions} from "./actions/moving.js"
import {outline_spatial_actions} from "./actions/spatial.js"
import {outline_selection_actions} from "./actions/selection.js"

export type OutlineActions = ZipAction.Callable<typeof outline_actions>

export const outline_actions: ZipAction.Blueprint<State> = {
	items: outline_item_actions,
	moving: outline_moving_actions,
	spatial: outline_spatial_actions,
	selection: outline_selection_actions,
}

