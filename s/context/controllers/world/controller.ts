
import {watch} from "@benev/slate"

import {magic} from "./magic.js"
import {Units} from "./units/units.js"
import {Mover} from "./mover/mover.js"
import {Tree} from "../tree/controller.js"
import {Babylon} from "./babylon/babylon.js"
import {Id} from "../../../tools/fresh_id.js"
import {Porthole} from "./porthole/porthole.js"
import {Warehouse} from "./warehouse/warehouse.js"
import {OutlineGenius} from "../outline_genius/controller.js"

export class World {
	#units: Units
	#babylon = new Babylon()

	onRender = this.#babylon.onRender
	warehouse: Warehouse
	mover: Mover

	constructor(tree: Tree, outline: OutlineGenius) {
		this.warehouse = new Warehouse(tree, this.#babylon.scene)
		this.#units = new Units(this.warehouse, outline)

		this.mover = new Mover(
			tree,
			outline,
			id => this.#units.get_unit(id),
		)

		watch.track(
			() => tree.state.outline,
			() => this.#units.synchronize(),
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

