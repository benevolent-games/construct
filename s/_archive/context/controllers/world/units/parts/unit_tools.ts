
import {deepEqual} from "@benev/slate"

import {AnyUnit} from "./types.js"
import {Id} from "../../../../../tools/fresh_id.js"
import {InstanceUnit} from "../../units/instance.js"
import {Warehouse} from "../../warehouse/warehouse.js"
import {get_actual_meshes} from "./get_actual_meshes.js"
import {Item} from "../../../../domains/outline/types.js"
import {PropAddress} from "../../warehouse/parts/types.js"

export function make_unit_tools(
		units: Map<Id, AnyUnit>,
		warehouse: Warehouse,
	) {

	const addresses = new Map<Id, PropAddress>()

	function add_instance(item: Item.Instance) {
		const {glb, prop} = warehouse.trace_prop(item.address)
		if (glb && prop) {
			addresses.set(item.id, item.address)
			const node = prop.top_lod.node.instantiateHierarchy()!
			const meshes = get_actual_meshes(node)
			const instance = new InstanceUnit(
				item.id,
				node,
				meshes,
			)
			units.set(item.id, instance)
			return instance
		}
		else {
			console.warn(`prop missing for item "${item.name}" ${item.id}`)
		}
	}

	function add_light(_item: Item.Light) {
		console.warn("todo: lights")
	}

	////////
	////////
	////////

	function add_for_item(item: Item.Whatever) {
		switch (item.kind) {
			case "instance":
				return add_instance(item)
			case "light":
				return add_light(item)
		}
	}

	function delete_by_id(id: Id) {
		const unit = units.get(id)
		if (unit) {
			unit.cleanup()
			addresses.delete(id)
			units.delete(id)
		}
	}

	function update_prop_if_glb_changed(item: Item.Instance) {
		const old_address = addresses.get(item.id)
		if (deepEqual(item.address, old_address)) {
			delete_by_id(item.id)
			add_for_item(item)
		}
	}

	return {
		add_for_item,
		delete_by_id,
		update_prop_if_glb_changed,
	}
}

