
import {AbstractMesh} from "@babylonjs/core/Meshes/abstractMesh.js"

import {magic} from "../magic.js"
import {InstanceUnit} from "./instance.js"
import {Id} from "../../../../tools/fresh_id.js"
import {Warehouse} from "../warehouse/warehouse.js"
import {AnyUnit, UnitSource} from "./parts/types.js"
import {make_unit_tools} from "./parts/unit_tools.js"
import {Item} from "../../../domains/outline/types.js"
import {OutlineGenius} from "../../outline_genius/controller.js"

export class Units {
	#warehouse: Warehouse
	#outline: OutlineGenius
	#map = new Map<Id, AnyUnit>
	#tools: ReturnType<typeof make_unit_tools>

	constructor(warehouse: Warehouse, outline: OutlineGenius) {
		this.#warehouse = warehouse
		this.#outline = outline
		this.#tools = make_unit_tools(this.#map, warehouse)
	}

	get_unit<U extends AnyUnit>(id: Id) {
		const unit = this.#map.get(id)
		if (unit)
			return unit as U
		else
			throw new Error(`unit not found ${id}`)
	}

	;[magic] = {
		find_id_for_mesh: (mesh: AbstractMesh) => {
			for (const [id, unit] of this.#map) {
				if (unit instanceof InstanceUnit && unit[magic].hasMesh(mesh))
					return id
			}
		}
	}

	synchronize() {
		const sources = this.#get_source_items()
		this.#add_and_remove_pods_based_on_items(sources)
		this.#handle_glb_changes_by_swapping_props(sources)
		this.#sync_spatial_positions_and_such(sources)
	}

	#get_source_items(): UnitSource[] {
		return [
			...this.#outline.instances,
			...this.#outline.lights,
		]
	}

	#add_and_remove_pods_based_on_items(sources: UnitSource[]) {
		sources
			.filter(item => !this.#map.has(item.id))
			.forEach(this.#tools.add_for_item)

		Array.from(this.#map.keys())
			.filter(id => !sources.some(item => item.id === id))
			.forEach(this.#tools.delete_by_id)
	}

	#handle_glb_changes_by_swapping_props(sources: UnitSource[]) {
		sources
			.filter(item => item.kind === "instance")
			.filter(item => this.#map.has(item.id))
			.forEach(source => {
				const item = source as Item.Instance
				const {status} = this.#warehouse.trace_prop(item.address)
				if (status === "available")
					this.#tools.update_prop_if_glb_changed(item)
				else
					this.#tools.delete_by_id(item.id)
			})
	}

	#sync_spatial_positions_and_such(sources: UnitSource[]) {
		sources
			.filter(item => !!item.spatial && this.#map.has(item.id))
			.map(item => ({item, unit: this.#map.get(item.id)!}))
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

