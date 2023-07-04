import {CueGroup} from "@benev/frog"
import {Outliner} from "../tools/outliner.js"

export class Context {
	cues = new CueGroup()
	folders = this.cues.create(new Outliner())
}

