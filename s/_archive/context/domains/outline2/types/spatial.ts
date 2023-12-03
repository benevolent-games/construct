
import {V3, v3} from "@benev/toolbox/x/utils/v3.js"
import {Quat} from "@benev/toolbox/x/utils/quat.js"

export type Spatial = {
	position: V3
	scale: V3
	rotation: Quat
}

export function init_spatial(): Spatial {
	return {
		position: v3.zero(),
		scale: [1, 1, 1],
		rotation: [0, 0, 0, 1],
	}
}

