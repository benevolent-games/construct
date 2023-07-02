
import {Folder} from "../tools/folder.js"
import {AbstractMesh} from "@babylonjs/core/Meshes/abstractMesh.js"
import {FoldersDragDropManager} from "../tools/folders-drag-drop-manager.js"
import {ObjectsDragDropManager} from "../tools/objects-drag-drop-manager.js"

export type Object = {
	id: string
	name: string
	mesh: AbstractMesh
}

export interface FolderSource {
	parent_folder: Folder
	child_folder: Folder
}

export interface ObjectSource {
	object: Object
	folder: Folder
}

export type Publish = () => Promise<void>

export interface Managers {
	folders_drag_drop_manager: FoldersDragDropManager
	objects_drag_drop_manager: ObjectsDragDropManager
}
