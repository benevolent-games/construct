
import {snapstate} from "@chasemoskal/snapstate"
import {Mesh} from "@babylonjs/core/Meshes/mesh.js"

import {Thing} from "./types.js"
import {Folder} from "../tools/outliner-pubsub.js"

export class Context {

	world = snapstate({
		originals: [] as Thing[],
		instances: [
			{id: "1", name: "thing1", mesh: new Mesh("mesh")}
		] as Thing[],
		details: {
			scene_name: "untitled scene",
			vertex_count: 0,
		},
	})

	folders = snapstate({
		root_folder: new Folder()
	})
}

