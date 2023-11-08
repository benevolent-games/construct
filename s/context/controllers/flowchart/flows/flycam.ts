
import {Flow, m} from "../parts/types.js"

export class FlycamFlow extends Flow {
	modes = m(
		"flycam",
		"fps",
		"history",
		"selectable",
	)
}

