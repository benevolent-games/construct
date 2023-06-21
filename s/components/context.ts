
import {Folder, Thing} from "./types.js"
import {snapstate} from "@chasemoskal/snapstate"
import {Mesh} from "@babylonjs/core/Meshes/mesh.js"

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
		root_folder: {
			name: "Scene",
			things: [{id: "1", name: "thing1", mesh: new Mesh("mesh")}] as Thing[],
			folders: [
					{
					name: "some folder1",
					things: [{id: "1", name: "thing1", mesh: new Mesh("mesh")}],
					folders: [{
						name: "some folderXX",
						things: [{id: "1", name: "thing1", mesh: new Mesh("mesh")}],
						folders: []
				}]
				},
				{
					name: "some folder2",
					things: [{id: "1", name: "thing1", mesh: new Mesh("mesh")}],
					folders: [{
						name: "some folder3",
						things: [{id: "1", name: "thing1", mesh: new Mesh("mesh")}],
						folders: []
				}]
				}
			] as Folder[]
		}
	})
}

