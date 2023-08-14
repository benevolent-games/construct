
import {Flat} from "@benev/frog"
import {Scene} from "@babylonjs/core/scene.js"
import {Catalog} from "./aspects/catalog/catalog.js"

export class Context {
	readonly catalog: Catalog

	constructor(
			public flat: Flat,
			public scene: Scene,
		) {
		this.catalog = new Catalog(this.flat, scene)
	}
}

