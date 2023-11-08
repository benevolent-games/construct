
import {Flow, FlowOptions, m} from "../parts/types.js"

export class FlycamFlow extends Flow {
	modes = m(
		"flycam",
		"fps",
		"history",
		"selectable",
	)

	constructor(options: FlowOptions, lol: number) {
		super(options)
		console.log("TODO flycam", lol)
	}
}

