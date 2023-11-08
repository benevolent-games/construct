
import {Flow, m} from "../parts/types.js"

export class FlycamGrabbingFlow extends Flow {
	modes = m(
		"operation",
		"flycam_grabbed",
		"flycam",
		"fps",
	)
}

