
import {Id} from "../../graph/parts/types.js"
import {AssetContainer} from "@babylonjs/core/assetContainer.js"
import {AbstractMesh} from "@babylonjs/core/Meshes/abstractMesh.js"
import {TransformNode} from "@babylonjs/core/Meshes/transformNode.js"

export type CatalogState = {
	glbs: Glb[]
}

export type Glb = {
	hash: string
	name: string
	size: number
	container: AssetContainer
	props: AssetProp[]
}

export type AssetProp = {
	id: Id
	name: string
	lods: LODs
	collision: undefined | PropNode
}

export const lod_names = ["high", "mid", "potato", "cringe", "meme"] as (keyof LODs)[]

export type LODs = {
	high: LOD
	mid: LOD
	potato: LOD
	cringe: LOD
	meme: LOD | undefined
}

export type LOD = {
	node: PropNode
	twosided: boolean
}

export type PropNode = TransformNode | AbstractMesh

