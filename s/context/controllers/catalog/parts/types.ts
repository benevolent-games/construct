
import {AssetContainer} from "@babylonjs/core/assetContainer.js"
import {AbstractMesh} from "@babylonjs/core/Meshes/abstractMesh.js"
import {TransformNode} from "@babylonjs/core/Meshes/transformNode.js"

import {GlbSlot} from "../../../state.js"
import {Id} from "../../../domains/outline/types.js"

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

export type PropAddress = {
	slot: Id
	prop: string
}

export type PropTraceFailed = {
	status: "missing-slot" | "missing-glb" | "missing-prop"
	slot: undefined
	glb: undefined
	prop: undefined
}

export type PropTraceSuccess = {
	status: "available"
	slot: GlbSlot
	glb: Glb
	prop: GlbProp
}

export type PropTrace = PropTraceSuccess | PropTraceFailed

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

