
import {Camera} from "@babylonjs/core/Cameras/camera.js"

import {Context} from "../../../context/context.js"
import {PointerTracker} from "./pointer_tracker.js"
import {ray_for_picking_on_canvas} from "./ray_for_picking_on_canvas.js"
import {make_outline_tools} from "../../../context/domains/outline/tools.js"

export const selecting_objects = (
		context: Context,
		canvas: HTMLCanvasElement,
		camera: Camera,
		pointerTracker: PointerTracker,
	) => () => {

	return context.gesture.on.buttons.select(input => {
		const {babylon, world, tree} = context

		const user_is_engaging_select_process = (
			input.down &&
			pointerTracker.canvasCoordinates
		)

		if (!user_is_engaging_select_process)
			return

		const pick = babylon.scene.pickWithRay(
			ray_for_picking_on_canvas(
				camera,
				canvas,
				pointerTracker.canvasCoordinates!,
			)
		)

		if (pick && pick.hit && pick.pickedMesh) {
			const id = world.find_id_for_mesh(pick.pickedMesh)
			if (id) {
				const tools = make_outline_tools(tree.state.outline)
				const item = tools.getItem(id)
				if (item.selected)
					tree.actions.items.deselect(id)
				else
					tree.actions.items.select(id)
			}
		}
		else
			tree.actions.items.clear_selection()
	})
}

