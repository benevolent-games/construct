
import {AssetContainer} from "@babylonjs/core/assetContainer.js"

export type Glb = {
	hash: string
	name: string
	size: number
	container: AssetContainer
}

export type CatalogState = {
	glbs: Glb[]
}

