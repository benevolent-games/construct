
import {StateTree, WatchTower} from "@benev/slate"

import {State} from "../../state.js"
import {Warehouse} from "../warehouse/warehouse.js"
import {Id, Item} from "../../domains/outline/types.js"
import {make_outline_tools} from "../../domains/outline/tools.js"

export type Thing = {dispose: () => void}

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

	things = new Map<Id, Thing>()

	#add(item: Item.Whatever) {
		console.log("add", item.name)
		switch (item.kind) {
			case "instance":
				const {glb, prop} = this.warehouse.trace_prop(item.address)
				if (glb && prop) {
					const instance = prop.top_lod.node.instantiateHierarchy()!
					console.log("instantiated", instance)
					const dispose = () => instance.dispose()
					this.things.set(item.id, {dispose})
				}
				else console.error(`failed to create instance "${item.name}" ${item.id}`)
				break
			case "light":
				console.log("todo: lights")
				break
		}
	}

	#delete([id, {dispose}]: [Id, Thing]) {
		console.log("delete", id)
		dispose()
		this.things.delete(id)
	}

	#delete_by_id(id: Id) {
		console.log("delete by id", id)
		const item = this.things.get(id)
		if (item) {
			item.dispose()
			this.things.delete(id)
		}
	}

	reconsider() {
		console.log("reconsider")
		const {things} = this
		const {outline} = this.app.state
		const tools = make_outline_tools(outline)
		const items = [...tools.instances, ...tools.lights]

		const new_items = items
			.filter(item => !things.has(item.id))

		const old_items = [...things]
			.filter(([id]) => !items.some(i => i.id === id))

		for (const new_item of new_items)
			this.#add(new_item)

		for (const old_item of old_items)
			this.#delete(old_item)

		for (const item of items) {
			if (item.kind === "instance") {
				const {status} = this.warehouse.trace_prop(item.address)
				if (status !== "available")
					this.#delete_by_id(item.id)
			}
		}
	}
}

