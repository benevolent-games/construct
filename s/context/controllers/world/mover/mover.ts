
import {Signal, signal} from "@benev/slate"

import {magic} from "../magic.js"
import {AnyUnit} from "../units/parts/types.js"
import {Porthole} from "../porthole/porthole.js"
import {Id} from "../../../../tools/fresh_id.js"
import {Edcore} from "../../edcore/controller.js"
import {InstanceUnit} from "../../world/units/instance.js"
import {Spatial} from "../../../domains/outline/spatial.js"
import {OutlineGenius} from "../../outline_genius/controller.js"

export type Grabbed = {
	itemIds: Id[]
	cleanup: () => void
}

export class Mover {
	grabbed: Signal<Grabbed | null>

	constructor(
			private edcore: Edcore,
			private outline: OutlineGenius,
			private get_unit: (id: Id) => AnyUnit
		) {

		this.grabbed = signal(null)
	}

	toggleGrab(porthole: Porthole) {
		if (this.grabbed.value)
			this.ungrab()
		else
			this.#grab(porthole)
	}

	#grab(porthole: Porthole) {
		const {edcore, outline} = this
		const subjects = outline
			.selected
			.filter(item => item.kind === "instance")
			.map(item => ({item, unit: this.get_unit(item.id) as InstanceUnit}))

		if (subjects.length > 0) {
			for (const {unit} of subjects)
				unit[magic].setParent(porthole[magic].get_camera())

			function cleanup() {
				for (const {unit} of subjects)
					unit[magic].setParent(null)

				edcore.actions.outline.set_spatial(...subjects.map(
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

	ungrab() {
		const {grabbed} = this
		if (grabbed.value) {
			grabbed.value.cleanup()
			grabbed.value = null
		}
	}
}

