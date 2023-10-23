
import {StateTree, WatchTower} from "@benev/slate"

import {State} from "../../state.js"
import {Babylon} from "../babylon/babylon.js"
import {Catalog} from "../catalog/catalog.js"
import {Id, Item} from "../../domains/outline/types.js"
import {make_outline_tools} from "../../domains/outline/tools.js"

export type Thing = {dispose: () => void}

export class Instantiator {

	constructor(
			public watch: WatchTower,
			public app: StateTree<State>,
			public babylon: Babylon,
			public catalog: Catalog,
		) {

		watch.track(
			() => app.state.outline,
			() => this.reconsider(),
		)
	}

	things = new Map<Id, Thing>()

	#add(item: Item.Whatever) {
		console.log("add", item.name)
		switch (item.kind) {
			case "instance":
				const {glb, prop} = this.catalog.search_prop(item)
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
	}
}

