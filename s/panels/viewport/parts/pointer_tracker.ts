
import {Initiator} from "@benev/slate"
import {V2} from "@benev/toolbox/x/utils/v2.js"
import {coordinates_in_rect} from "./coordinates_in_rect.js"
import {PointerMovements} from "../../../tools/tactic/sketch.js"

export class PointerTracker extends Initiator {
	canvasCoordinates: V2 | null = null
	deinit: () => void

	constructor(
			pointerMovements: PointerMovements,
			canvas: HTMLCanvasElement,
		) {

		super()

		this.deinit = pointerMovements.onInput(() => {
			this.canvasCoordinates = coordinates_in_rect(
				pointerMovements.coordinates,
				canvas.getBoundingClientRect(),
			)
		})
	}
}

