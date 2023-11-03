
import {V3, v3} from "@benev/toolbox/x/utils/v3.js"

export function v3_sum(...vectors: V3[]) {
	return vectors.reduce(
		(previous, current) => v3.add(previous, current),
		[0, 0, 0] as V3,
	)
}

export function v3_average(...vectors: V3[]) {
	return v3.divideBy(
		v3_sum(...vectors),
		vectors.length,
	)
}

