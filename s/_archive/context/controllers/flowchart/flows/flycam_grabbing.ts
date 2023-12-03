
import {Flow, m} from "../parts/flow.js"

export class FlycamGrabbingFlow extends Flow {
	modes = m(
		"operation",
		"flycam_grabbed",
		"flycam",
		"fps",
	)
}

