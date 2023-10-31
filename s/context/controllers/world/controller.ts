
import {StateTree, WatchTower} from "@benev/slate"
import {AbstractMesh} from "@babylonjs/core/Meshes/abstractMesh.js"

import {State} from "../../state.js"
import {Pod} from "./parts/pod_types.js"
import {Id} from "../../../tools/fresh_id.js"
import {Warehouse} from "../warehouse/warehouse.js"
import {Item} from "../../domains/outline/types.js"
import {make_pod_tools} from "./parts/pod_tools.js"
import {make_outline_tools} from "../../domains/outline/tools.js"

export class World {
	#pods = new Map<Id, Pod.Whatever>()
	#podTools: ReturnType<typeof make_pod_tools>

	constructor(
			watch: WatchTower,
			private app: StateTree<State>,
			private warehouse: Warehouse,
		) {

		this.#podTools = make_pod_tools(
			this.#pods,
			warehouse,
		)

		watch.track(
			() => app.state,
			() => this.synchronize(),
		)
	}

	find_id_for_mesh(mesh: AbstractMesh) {
		for (const [id, pod] of this.#pods)
			if (pod.kind === "instance" && pod.meshes.includes(mesh))
				return id
	}

	synchronize() {
		const sources = this.#get_source_items()
		this.#add_and_remove_pods_based_on_items(sources)
		this.#handle_glb_changes_by_swapping_props(sources)
		this.#represent_selections_with_visual_indicators(sources)
	}

	#get_source_items(): Pod.SourceItem[] {
		const {outline} = this.app.state
		const outlineTools = make_outline_tools(outline)
		return [
			...outlineTools.instances,
			...outlineTools.lights,
		]
	}

	#add_and_remove_pods_based_on_items(sources: Pod.SourceItem[]) {
		sources
			.filter(item => !this.#pods.has(item.id))
			.forEach(this.#podTools.add_pod_for_item)

		Array.from(this.#pods.keys())
			.filter(id => !sources.some(item => item.id === id))
			.forEach(this.#podTools.delete_pod_by_id)
	}

	#handle_glb_changes_by_swapping_props(sources: Pod.SourceItem[]) {
		sources
			.filter(item => item.kind === "instance")
			.filter(item => this.#pods.has(item.id))
			.forEach(source => {
				const item = source as Item.Instance
				const {status, glb} = this.warehouse.trace_prop(item.address)
				if (status === "available")
					this.#podTools.update_prop_if_glb_changed(item, glb)
				else
					this.#podTools.delete_pod_by_id(item.id)
			})
	}

	#represent_selections_with_visual_indicators(sources: Pod.SourceItem[]) {
		sources
			.filter(item => this.#pods.has(item.id))
			.map(item => ({item, pod: this.#pods.get(item.id)!}))
			.filter(({item, pod}) => pod.selected !== item.selected)
			.forEach(this.#podTools.update_selection_indicators)
	}
}

