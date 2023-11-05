
import {Mesh} from "@babylonjs/core/Meshes/mesh.js"
import {AbstractMesh} from "@babylonjs/core/Meshes/abstractMesh.js"
import {InstancedMesh} from "@babylonjs/core/Meshes/instancedMesh.js"
import {TransformNode} from "@babylonjs/core/Meshes/transformNode.js"

export function get_actual_meshes(
		node: TransformNode | Mesh | InstancedMesh,
	) {
	return node instanceof AbstractMesh
		? [node, ...node.getChildMeshes()]
		: node.getChildMeshes()
}

