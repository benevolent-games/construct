
import {Vec2} from "@benev/toolbox"
import {Initiator} from "@benev/slate"
import {coordinates_in_rect} from "../../../tools/coordinates_in_rect.js"
import {PointerMovements} from "../../../tools/impulse/devices/pointer_movements.js"

export class PointerTracker extends Initiator {
	canvasCoordinates: Vec2 | null = null

	constructor(
			pointerMovements: PointerMovements,
			canvas: HTMLCanvasElement,
		) {
		super()

		this.cleanup(pointerMovements.onInput(() => {
			this.canvasCoordinates = coordinates_in_rect(
				pointerMovements.coordinates,
				canvas.getBoundingClientRect(),
			)
		}))
	}
}

