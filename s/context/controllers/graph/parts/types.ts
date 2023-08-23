
import {Mesh} from "@babylonjs/core/Meshes/mesh.js"
import {TransformNode} from "@babylonjs/core/Meshes/transformNode.js"

export type Id = string

export type Unit = {
	name: string
	node: TransformNode | Mesh
}

