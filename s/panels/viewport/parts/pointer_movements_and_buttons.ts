
import {V2} from "@benev/toolbox/x/utils/v2.js"
import {Camera} from "@babylonjs/core/Cameras/camera.js"

import {Context} from "../../../context/context.js"
import {coordinates_in_rect} from "./coordinates_in_rect.js"
import {ray_for_picking_on_canvas} from "./ray_for_picking_on_canvas.js"
import {make_outline_tools} from "../../../context/domains/outline/tools.js"

export const pointer_movements_and_buttons = (
		context: Context,
		canvas: HTMLCanvasElement,
		camera: Camera,
	) => () => {

	const {babylon, input, world, actions} = context

	let canvasCoordinates: V2 | null = null

	const disposeMovements = input.pointerMovements.onInput(() => {
		canvasCoordinates = coordinates_in_rect(
			input.pointerMovements.coordinates,
			canvas.getBoundingClientRect(),
		)
	})

	const disposeButtons = input.tactic.on.buttons.select(inp => {
		if (inp.down && canvasCoordinates) {
			const pick = babylon.scene.pickWithRay(
				ray_for_picking_on_canvas(
					camera,
					canvas,
					canvasCoordinates,
				)
			)

			if (pick && pick.hit && pick.pickedMesh) {
				const id = world.find_id_for_mesh(pick.pickedMesh)
				if (id) {
					const tools = make_outline_tools(context.state.outline)
					const item = tools.getItem(id)
					if (item.selected)
						actions.items.deselect(id)
					else
						actions.items.select(id)
				}
			}
			else {
				actions.items.clear_selection()
			}
		}
	})

	return () => {
		disposeMovements()
		disposeButtons()
	}
}

