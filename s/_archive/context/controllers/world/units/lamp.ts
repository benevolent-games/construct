
import {Light} from "@babylonjs/core/Lights/light.js"

import {BaseUnit} from "./base.js"
import {Id} from "../../../../tools/fresh_id.js"

export class LampUnit extends BaseUnit {
	#light: Light

	constructor(id: Id, light: Light) {
		super(id)
		this.#light = light
	}

	hidden = false
	selected = false

	cleanup() {
		this.#light.dispose()
	}
}

