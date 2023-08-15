
import {Flat} from "@benev/frog"
import {Scene} from "@babylonjs/core/scene.js"
import {SceneLoader} from "@babylonjs/core/Loading/sceneLoader.js"

import {Graph} from "../graph/graph.js"
import {CatalogState, Glb} from "./parts/types.js"
import {quick_hash} from "../../../tools/quick_hash.js"
import { parse_props } from "./parts/parse_props.js"

export class Catalog {
	#scene: Scene
	#state: CatalogState
	readonly state: CatalogState

	constructor(flat: Flat, graph: Graph, scene: Scene) {
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

		const props = parse_props(container)

		for (const prop of props) {
			console.log("")
			console.log(prop.name)
			console.log("  - collision", prop.collision?.name)
			console.log("  - lods:")
			for (const [key, lod] of Object.entries(prop.lods))
				console.log("    - ", key, lod)
		}

		this.add_glb({
			hash,
			name: file.name,
			size: file.size,
			container,
			props,
		})

		return true
	}
}

