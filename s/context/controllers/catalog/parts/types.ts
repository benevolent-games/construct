
import {AssetContainer} from "@babylonjs/core/assetContainer.js"
import {AbstractMesh} from "@babylonjs/core/Meshes/abstractMesh.js"
import {TransformNode} from "@babylonjs/core/Meshes/transformNode.js"

export type Glb = {
	hash: string
	name: string
	size: number
	container: AssetContainer
	props: GlbProp[]
}

export type GlbProp = {
	name: string
	lods: LODs
	first_lod_index: number
	top_lod: LOD
	collision: undefined | PropNode
}

export type GlbRef = {
	hash: string
	name: string
}

export type PropRef = {
	glb: GlbRef
	name: string
}

export type PropStatus = "found" | "glb-missing" | "prop-missing"

export type PropSearchReport = {
	glb: Glb | undefined
	prop: GlbProp | undefined
	status: PropStatus
}

export const lod_info = [
	["incredible", 5],
	["nice", 10],
	["plain", 20],
	["squinty", 40],
	["pathetic", 80],
] as const

export const lod_names = lod_info.map(([name]) => name)
export const lod_distances = lod_info.map(([,distance]) => distance)

export type LODs = [MaybeLOD, MaybeLOD, MaybeLOD, MaybeLOD, MaybeLOD]

export type LOD = {
	node: PropNode
	twosided: boolean
}

export type MaybeLOD = LOD | undefined

export type PropNode = TransformNode | AbstractMesh

