
import {StateTree, WatchTower} from "@benev/slate"

import {State} from "../../state.js"
import {Warehouse} from "../warehouse/warehouse.js"
import {Item} from "../../domains/outline/types.js"
import {make_outline_tools} from "../../domains/outline/tools.js"

export type Thing = {
	glb_hash: Item.Id
	dispose: () => void
}

export class Instantiator {

	constructor(
			watch: WatchTower,
			private app: StateTree<State>,
			private warehouse: Warehouse,
		) {

		watch.track(
			() => [
				app.state.outline,
				app.state.slots,
			],
			() => this.reconsider(),
		)
	}

	things = new Map<Item.Id, Thing>()

	#add(item: Item.Whatever) {
		switch (item.kind) {
			case "instance":
				const {glb, prop} = this.warehouse.trace_prop(item.address)
				if (glb && prop) {
					const instance = prop.top_lod.node.instantiateHierarchy()!
					const dispose = () => instance.dispose()
					this.things.set(item.id, {dispose, glb_hash: glb.hash})
				}
				else console.error(`failed to create instance "${item.name}" ${item.id}`)
				break
			case "light":
				console.warn("todo: lights")
				break
		}
	}

	#delete_by_id(id: Item.Id) {
		const item = this.things.get(id)
		if (item) {
			item.dispose()
			this.things.delete(id)
		}
	}

	reconsider() {
		const {things} = this
		const {outline} = this.app.state
		const tools = make_outline_tools(outline)
		const items = [...tools.instances, ...tools.lights]

		const new_items = items
			.filter(item => !things.has(item.id))

		const old_item_ids = [...things]
			.filter(([id]) => !items.some(i => i.id === id))
			.map(([id]) => id)

		for (const new_item of new_items)
			this.#add(new_item)

		for (const old_id of old_item_ids)
			this.#delete_by_id(old_id)

		for (const item of items) {
			if (item.kind === "instance") {
				const {status, glb} = this.warehouse.trace_prop(item.address)
				if (status === "available") {
					const thing = this.things.get(item.id)!
					if (thing.glb_hash !== glb.hash) {
						this.#delete_by_id(item.id)
						this.#add(item)
					}
				}
				else
					this.#delete_by_id(item.id)
			}
		}
	}
}

