
import {Color4} from "@babylonjs/core/Maths/math.color.js"

import {Pod} from "./pod_types.js"
import {Id} from "../../../../tools/fresh_id.js"
import {Glb} from "../../warehouse/parts/types.js"
import {Item} from "../../../domains/outline/types.js"
import {Warehouse} from "../../warehouse/warehouse.js"
import {get_actual_meshes} from "./get_actual_meshes.js"

export function make_pod_tools(
		pods: Map<Id, Pod.Whatever>,
		warehouse: Warehouse,
	) {

	function add_instance_pod(item: Item.Instance) {
		const {glb, prop} = warehouse.trace_prop(item.address)
		if (glb && prop) {
			const node = prop.top_lod.node.instantiateHierarchy()!
			const meshes = get_actual_meshes(node)
			pods.set(item.id, {
				kind: "instance",
				meshes,
				id: item.id,
				glb_hash: glb.hash,
				apparent: false,
				selected: false,
				dispose: () => node.dispose(),
			})
		}
		else console.error(`failed to create instance "${item.name}" ${item.id}`)
	}

	function add_light_pod(_item: Item.Light) {
		console.warn("todo: lights")
	}

	////////
	////////
	////////

	function add_pod_for_item(item: Item.Whatever) {
		switch (item.kind) {
			case "instance":
				return add_instance_pod(item)
			case "light":
				return add_light_pod(item)
		}
	}

	function delete_pod_by_id(id: Id) {
		const pod = pods.get(id)
		if (pod) {
			pod.dispose()
			pods.delete(id)
		}
	}

	function update_prop_if_glb_changed(item: Item.Instance, glb: Glb) {
		const pod = pods.get(item.id) as Pod.Instance
		if (pod.glb_hash !== glb.hash) {
			delete_pod_by_id(item.id)
			add_pod_for_item(item)
		}
	}

	function update_selection_indicators({item, pod}: {
			item: Pod.SourceItem
			pod: Pod.Whatever
		}) {

		pod.selected = item.selected

		if (pod.kind === "instance") {
			for (const mesh of pod.meshes) {
				if (item.selected) {
					mesh.enableEdgesRendering()
					mesh.edgesWidth = 8
					mesh.edgesColor = new Color4(1, 1, 0, 1)
				}
				else {
					mesh.disableEdgesRendering()
				}
			}
		}
	}

	return {
		add_pod_for_item,
		delete_pod_by_id,
		update_prop_if_glb_changed,
		update_selection_indicators,
	}
}

