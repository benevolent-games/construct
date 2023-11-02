
import {V2} from "@benev/toolbox/x/utils/v2.js"
import {coordinates_in_rect} from "./coordinates_in_rect.js"
import {PointerMovements} from "../../../tools/tactic/sketch.js"

export class PointerTracker {
	canvasCoordinates: V2 | null = null
	dispose: () => void

	constructor(
			pointerMovements: PointerMovements,
			canvas: HTMLCanvasElement,
		) {

		this.dispose = pointerMovements.onInput(() => {
			this.canvasCoordinates = coordinates_in_rect(
				pointerMovements.coordinates,
				canvas.getBoundingClientRect(),
			)
		})
	}
}

