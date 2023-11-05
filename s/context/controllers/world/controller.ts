
import {SignalTower, WatchTower} from "@benev/slate"
import {AbstractMesh} from "@babylonjs/core/Meshes/abstractMesh"

import {Id} from "../../../tools/fresh_id"
import {Tree} from "../tree/controller.js"
import {Babylon} from "./babylon/babylon.js"
import {InstanceUnit} from "./units/instance.js"
import {Warehouse} from "./warehouse/warehouse.js"
import {Item} from "../../domains/outline/types.js"
import {AnyUnit, UnitSource} from "./units/parts/types.js"
import {make_unit_tools} from "./units/parts/unit_tools.js"
import {make_outline_tools} from "../../domains/outline/tools.js"

export class World {
	#units = new Map<Id, AnyUnit>
	#unitTools: ReturnType<typeof make_unit_tools>

	babylon = new Babylon()
	warehouse: Warehouse

	constructor(
			signals: SignalTower,
			watch: WatchTower,
			private tree: Tree,
		) {

		this.warehouse = new Warehouse(
			signals,
			watch,
			tree,
			this.babylon.scene,
		)

		this.#unitTools = make_unit_tools(
			this.#units,
			this.warehouse,
		)

		watch.track(
			() => tree.state,
			() => this.#synchronize(),
		)
	}

	get_unit<U extends AnyUnit>(id: Id) {
		const unit = this.#units.get(id)
		if (unit)
			return unit as U
		else
			throw new Error(`unit not found ${id}`)
	}

	find_id_for_mesh(mesh: AbstractMesh) {
		for (const [id, unit] of this.#units) {
			if (unit instanceof InstanceUnit && unit.hasMesh(mesh))
				return id
		}
	}

	#synchronize() {
		const sources = this.#get_source_items()
		this.#add_and_remove_pods_based_on_items(sources)
		this.#handle_glb_changes_by_swapping_props(sources)
		this.#sync_spatial_positions_and_such(sources)
	}

	#get_source_items(): UnitSource[] {
		const {outline} = this.tree.state
		const outlineTools = make_outline_tools(outline)
		return [
			...outlineTools.instances,
			...outlineTools.lights,
		]
	}

	#add_and_remove_pods_based_on_items(sources: UnitSource[]) {
		sources
			.filter(item => !this.#units.has(item.id))
			.forEach(this.#unitTools.add_for_item)

		Array.from(this.#units.keys())
			.filter(id => !sources.some(item => item.id === id))
			.forEach(this.#unitTools.delete_by_id)
	}

	#handle_glb_changes_by_swapping_props(sources: UnitSource[]) {
		sources
			.filter(item => item.kind === "instance")
			.filter(item => this.#units.has(item.id))
			.forEach(source => {
				const item = source as Item.Instance
				const {status} = this.warehouse.trace_prop(item.address)
				if (status === "available")
					this.#unitTools.update_prop_if_glb_changed(item)
				else
					this.#unitTools.delete_by_id(item.id)
			})
	}

	#sync_spatial_positions_and_such(sources: UnitSource[]) {
		sources
			.filter(item => !!item.spatial && this.#units.has(item.id))
			.map(item => ({item, unit: this.#units.get(item.id)!}))
			.forEach(({item, unit}) => {
				unit.selected = item.selected
				unit.hidden = !item.visible

				if (unit instanceof InstanceUnit) {
					unit.position = item.spatial.position
					unit.scale = item.spatial.scale
					unit.rotation = item.spatial.rotation
				}
			})
	}
}

