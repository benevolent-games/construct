import {CueGroup} from "@benev/frog"
import {Graph} from "../tools/graph.js"

export class Context {
	cues = new CueGroup()
	folders = this.cues.create(new Graph())
}

