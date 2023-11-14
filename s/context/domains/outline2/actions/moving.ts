
import {actionate} from "../../actionate.js"
import {move_into_container} from "./moves/move_into_container.js"
import {move_beside_another_item} from "./moves/move_beside_another_item.js"

export const outline_moving_actions = actionate.outline2.blueprint(() => ({
	move_into_container,
	move_above_another_item: move_beside_another_item("above"),
	move_below_another_item: move_beside_another_item("below"),
}))

