
// import {StateTree, WatchTower} from "@benev/slate"
// import {Mesh} from "@babylonjs/core/Meshes/mesh.js"
// import {Color4} from "@babylonjs/core/Maths/math.color.js"
// import {AbstractMesh} from "@babylonjs/core/Meshes/abstractMesh.js"
// import {TransformNode} from "@babylonjs/core/Meshes/transformNode.js"
// import {InstancedMesh} from "@babylonjs/core/Meshes/instancedMesh.js"

// import {State} from "../../state.js"
// import {Id} from "../../../tools/fresh_id.js"
// import {Warehouse} from "../warehouse/warehouse.js"
// import {Item} from "../../domains/outline/types.js"
// import {make_outline_tools} from "../../domains/outline/tools.js"

// export type Thing = {
// 	glb_hash: Id
// 	dispose: () => void
// }

// export class Instantiator {

// 	constructor(
// 			watch: WatchTower,
// 			private app: StateTree<State>,
// 			private warehouse: Warehouse,
// 		) {

// 		watch.track(
// 			() => [
// 				app.state.outline,
// 				app.state.slots,
// 			],
// 			() => this.reconsider(),
// 		)
// 	}

// 	things = new Map<Id, Thing>()

// 	instances = new Map<Id, {
// 		node: TransformNode,
// 		selected: boolean,
// 	}>()

// 	#meshes = new Map<AbstractMesh, Id>()

// 	#gizmos = new Map<Id, any>()

// 	#add(item: Item.Whatever) {
// 		switch (item.kind) {
// 			case "instance":
// 				const {glb, prop} = this.warehouse.trace_prop(item.address)
// 				if (glb && prop) {
// 					const node = prop.top_lod.node.instantiateHierarchy()!

// 					this.instances.set(item.id, {node, selected: false})
// 					const meshes = get_actual_meshes(node)

// 					for (const mesh of meshes)
// 						this.#meshes.set(mesh, item.id)

// 					const dispose = () => {
// 						node.dispose()
// 						this.instances.delete(item.id)
// 						this.things.delete(item.id)
// 						for (const mesh of meshes)
// 							this.#meshes.delete(mesh)
// 					}

// 					this.things.set(item.id, {dispose, glb_hash: glb.hash})
// 				}
// 				else console.error(`failed to create instance "${item.name}" ${item.id}`)
// 				break
// 			case "light":
// 				console.warn("todo: lights")
// 				break
// 		}
// 	}

// 	#delete_by_id(id: Id) {
// 		const item = this.things.get(id)
// 		if (item)
// 			item.dispose()
// 	}

// 	find_id_for_mesh(mesh: AbstractMesh): Id | undefined {
// 		return this.#meshes.get(mesh)
// 	}

// 	reconsider() {
// 		const {things} = this
// 		const {outline} = this.app.state
// 		const tools = make_outline_tools(outline)
// 		const items = [...tools.instances, ...tools.lights]

// 		const new_items = items
// 			.filter(item => !things.has(item.id))

// 		const old_item_ids = [...things]
// 			.filter(([id]) => !items.some(i => i.id === id))
// 			.map(([id]) => id)

// 		for (const new_item of new_items)
// 			this.#add(new_item)

// 		for (const old_id of old_item_ids)
// 			this.#delete_by_id(old_id)

// 		for (const item of items) {
// 			if (item.kind === "instance") {
// 				const {status, glb} = this.warehouse.trace_prop(item.address)
// 				if (status === "available") {
// 					const thing = this.things.get(item.id)!
// 					if (thing.glb_hash !== glb.hash) {
// 						this.#delete_by_id(item.id)
// 						this.#add(item)
// 					}
// 				}
// 				else
// 					this.#delete_by_id(item.id)
// 			}
// 		}

// 		this.evaluate_selections()
// 	}

// 	evaluate_selections() {
// 		const tools = make_outline_tools(this.app.state.outline)

// 		for (const [id, instance] of this.instances) {
// 			const item = tools.getItem(id) as Item.Instance
// 			if (instance.selected !== item.selected) {
// 				instance.selected = item.selected
// 				for (const mesh of get_actual_meshes(instance.node)) {
// 					if (item.selected) {
// 						mesh.enableEdgesRendering()
// 						mesh.edgesWidth = 8
// 						mesh.edgesColor = new Color4(1, 1, 0, 1)
// 					}
// 					else {
// 						mesh.disableEdgesRendering()
// 					}
// 				}
// 			}
// 		}

// 		// if (tools.selected.length > 0) {
// 		// 	const things = tools.selected.map(item => this.instances.get(item.id)!)
// 		// 	for (const thing of things) {
// 		// 		thing.node
// 		// 	}
// 		// 	const position = tools.selected
// 		// }
// 	}
// }

// //////////

// function get_actual_meshes(node: TransformNode | Mesh | InstancedMesh) {
// 	return node instanceof AbstractMesh
// 		? [node, ...node.getChildMeshes()]
// 		: node.getChildMeshes()
// }

