
import {Thing} from "./types.js"
import {snapstate} from "@chasemoskal/snapstate"

export class Context {

	world = snapstate({
		originals: [] as Thing[],
		instances: [] as Thing[],
		details: {
			scene_name: "untitled scene",
			vertex_count: 0,
		},
	})
}

