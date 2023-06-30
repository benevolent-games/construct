
import {Folder} from "../tools/folder.js"
import {FoldersManager} from "../tools/folders-manager.js"
import {ObjectsManager} from "../tools/objects-manager.js"
import {AbstractMesh} from "@babylonjs/core/Meshes/abstractMesh.js"

export type Thing = {
	id: string
	name: string
	mesh: AbstractMesh
}

export interface FolderSource {
	parent_folder: Folder
	child_folder: Folder
}

export interface ObjectSource {
	object: Thing
	folder: Folder
}

export type Publish = () => Promise<void>

export interface Managers {
	folders_manager: FoldersManager
	objects_manager: ObjectsManager
}
