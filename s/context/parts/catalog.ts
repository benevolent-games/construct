
import {Flat} from "@benev/frog"
import {Scene} from "@babylonjs/core/scene.js"
import {AssetContainer} from "@babylonjs/core/assetContainer.js"
import {SceneLoader} from "@babylonjs/core/Loading/sceneLoader.js"

import {quick_hash} from "../../tools/quick_hash.js"

export type Glb = {
	hash: string
	name: string
	size: number
	container: AssetContainer
}

export type CatalogState = {
	glbs: Glb[]
}

export class Catalog {
	#scene: Scene
	#state: CatalogState
	readonly state: CatalogState

	constructor(flat: Flat, scene: Scene) {
		this.#scene = scene
		this.#state = flat.state({glbs: []})
		this.state = Flat.readonly(this.#state)
	}

	add_glb(glb: Glb) {
		this.#state.glbs = [glb, ...this.#state.glbs]
	}

	async add_file(file: File) {
		const hash = await quick_hash(file)
		const already_exists = this.#state.glbs.find(g => g.hash === hash)

		if (already_exists)
			return false

		const container = await SceneLoader.LoadAssetContainerAsync(
			URL.createObjectURL(file),
			undefined,
			this.#scene,
			() => {},
			".glb",
		)

		this.add_glb({
			hash,
			container,
			name: file.name,
			size: file.size,
		})

		return true
	}
}

