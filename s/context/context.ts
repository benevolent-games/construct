
import {Flat} from "@benev/frog"
import {Scene} from "@babylonjs/core/scene.js"
import {Graph} from "./aspects/graph/graph.js"
import {Catalog} from "./aspects/catalog/catalog.js"

export class Context {
	readonly catalog: Catalog
	readonly graph = new Graph()

	constructor(
			public flat: Flat,
			public scene: Scene,
		) {
		this.catalog = new Catalog(this.flat, scene)
	}
}

