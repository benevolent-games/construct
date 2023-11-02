
import {Initiator} from "@benev/slate"
import {Scene} from "@babylonjs/core/scene.js"
import {Camera} from "@babylonjs/core/Cameras/camera.js"

import {Context} from "../../../context/context.js"
import {PointerTracker} from "./pointer_tracker.js"
import {ray_for_picking_on_canvas} from "./ray_for_picking_on_canvas.js"
import {make_outline_tools} from "../../../context/domains/outline/tools.js"

export class SelectingObjects extends Initiator {
	dispose: () => void

	constructor(
			context: Context,
			scene: Scene,
			canvas: HTMLCanvasElement,
			camera: Camera,
			pointerTracker: PointerTracker,
		) {

		super()

		this.dispose = context.input.tactic.on.buttons.select(input => {
			const {world, state, actions} = context

			const user_is_engaging_select_process = (
				input.down &&
				pointerTracker.canvasCoordinates
			)

			if (!user_is_engaging_select_process)
				return

			const pick = scene.pickWithRay(
				ray_for_picking_on_canvas(
					camera,
					canvas,
					pointerTracker.canvasCoordinates!,
				)
			)

			if (pick && pick.hit && pick.pickedMesh) {
				const id = world.find_id_for_mesh(pick.pickedMesh)
				if (id) {
					const tools = make_outline_tools(state.outline)
					const item = tools.getItem(id)
					if (item.selected)
						actions.items.deselect(id)
					else
						actions.items.select(id)
				}
			}
			else
				actions.items.clear_selection()
		})
	}
}

