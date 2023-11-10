
import {watch} from "@benev/slate"

import {magic} from "./magic.js"
import {Units} from "./units/units.js"
import {Mover} from "./mover/mover.js"
import {Tree} from "../tree/controller.js"
import {Babylon} from "./babylon/babylon.js"
import {Id} from "../../../tools/fresh_id.js"
import {Porthole} from "./porthole/porthole.js"
import {Warehouse} from "./warehouse/warehouse.js"

export class World {
	#units: Units
	#babylon = new Babylon()

	onRender = this.#babylon.onRender
	warehouse: Warehouse
	mover: Mover

	constructor(tree: Tree) {

		this.warehouse = new Warehouse(tree, this.#babylon.scene)

		this.#units = new Units(this.warehouse)

		this.mover = new Mover(
			tree,
			id => this.#units.get_unit(id),
		)

		watch.track(
			() => tree.state.outline,
			outline => this.#units.synchronize(outline),
		)
	}

	make_porthole(leafId: Id, canvas: HTMLCanvasElement) {
		return new Porthole(
			leafId,
			canvas,
			this.#babylon,
			this.#units[magic].find_id_for_mesh,
		)
	}
}

