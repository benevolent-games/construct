
import {Folder} from "../tools/folder.js"
import {AbstractMesh} from "@babylonjs/core/Meshes/abstractMesh.js"

export type Thing = {
	id: string
	name: string
	mesh: AbstractMesh
}

export interface Source {
	parent_folder: Folder
	child_folder: Folder
}

export type Publish = () => Promise<void>
