
import {Flow, m} from "../parts/flow.js"
import {FlowOptions} from "../parts/types.js"

export class FlycamFlow extends Flow {
	modes = m(
		"flycam",
		"fps",
		"history",
		"outline",
	)

	constructor(options: FlowOptions, lol: number) {
		super(options)
		console.log("TODO flycam", lol)
	}
}

