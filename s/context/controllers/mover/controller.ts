
import {Signal, SignalTower} from "@benev/slate"
import {Camera} from "@babylonjs/core/Cameras/camera.js"

import {Tree} from "../tree/controller.js"
import {World} from "../world/controller.js"
import {Id} from "../../../tools/fresh_id.js"
import {Gesture} from "../gesture/controller.js"
import {InstanceUnit} from "../world/units/instance.js"
import {Spatial} from "../../domains/outline/spatial.js"
import {make_outline_tools} from "../../domains/outline/tools.js"

export type Grabbed = {
	itemIds: Id[]
	cleanup: () => void
}

export class Mover {
	grabbed: Signal<Grabbed | null>

	constructor(
			signals: SignalTower,
			private tree: Tree,
			private world: World,
			private gesture: Gesture,
		) {

		this.grabbed = signals.signal(null)
	}

	toggleGrab(camera: Camera) {
		if (this.grabbed.value)
			this.#ungrab()
		else
			this.#grab(camera)
	}

	#grab(camera: Camera) {
		const {tree, world} = this
		const tools = make_outline_tools(tree.state.outline)
		const subjects = tools
			.selected
			.filter(item => item.kind === "instance")
			.map(item => ({item, unit: world.get_unit<InstanceUnit>(item.id)}))

		if (subjects.length > 0) {
			for (const {unit} of subjects)
				unit.setParent(camera)

			const nevermind = this.gesture.on_pointer_lock_disengaged.once(() => {
				this.#ungrab()
			})

			function cleanup() {
				nevermind()

				for (const {unit} of subjects)
					unit.setParent(null)

				tree.actions.items.set_spatial(...subjects.map(
					({item, unit}) => ({
						id: item.id,
						spatial: {
							scale: unit.scale,
							position: unit.position,
							rotation: unit.rotation,
						} satisfies Spatial,
					})
				))
			}

			this.grabbed.value = {
				itemIds: subjects.map(({item}) => item.id),
				cleanup,
			}
		}
		else
			this.grabbed.value = null
	}

	#ungrab() {
		const {grabbed} = this
		if (grabbed.value) {
			grabbed.value.cleanup()
			grabbed.value = null
		}
	}
}

