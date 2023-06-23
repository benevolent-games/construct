
import {AbstractMesh} from "@babylonjs/core/Meshes/abstractMesh.js"

export type Thing = {
	id: string
	name: string
	mesh: AbstractMesh | undefined
}
