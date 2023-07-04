import {Pub} from "@benev/frog"
import {AbstractMesh} from "@babylonjs/core/Meshes/abstractMesh.js"

import {Item} from "../tools/item.js"
import {Folder} from "../tools/folder.js"
import {FoldersDragDropManager} from "../tools/folders-drag-drop-manager.js"
import {ObjectsDragDropManager} from "../tools/objects-drag-drop-manager.js"

export type Original = {
	id: string
	name: string
	mesh: AbstractMesh
}

export interface FolderSource {
	parent_folder: Folder
	child_folder: Folder
}

export interface ObjectSource {
	item: Item
	folder: Folder
}

export type Publish = () => Promise<void>

export interface Managers {
	folders_drag_drop_manager: FoldersDragDropManager
	objects_drag_drop_manager: ObjectsDragDropManager
}

export interface OutlinerEvents {
	on_item_add: Pub<Item>
	on_item_remove: Pub<Item>
	on_folder_remove: Pub<Item[]>
}
