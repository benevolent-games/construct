import {CueGroup} from "@benev/frog"
import {Folder} from "../tools/folder.js"

export class Context {
	cues = new CueGroup()
	folders = this.cues.create(new Folder())
}

