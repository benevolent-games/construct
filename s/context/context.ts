
import {Flat} from "@benev/frog"
import {Catalog} from "./parts/catalog.js"
import {Scene} from "@babylonjs/core/scene.js"

export class Context {
	readonly catalog: Catalog

	constructor(
			public flat: Flat,
			public scene: Scene,
		) {
		this.catalog = new Catalog(this.flat, scene)
	}
}

