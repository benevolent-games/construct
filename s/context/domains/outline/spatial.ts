
import {vec3, Vec3, Quat} from "@benev/toolbox"

export type Spatial = {
	position: Vec3
	scale: Vec3
	rotation: Quat
}

export function init_spatial(): Spatial {
	return {
		position: vec3.zero(),
		scale: [1, 1, 1],
		rotation: [0, 0, 0, 1],
	}
}

