
import {Light} from "@babylonjs/core/Lights/light.js"

import {UnitBase} from "./base.js"
import {Id} from "../../../../tools/fresh_id.js"

export class UnitLamp extends UnitBase {
	#light: Light

	constructor(id: Id, light: Light) {
		super(id)
		this.#light = light
	}

	cleanup() {
		this.#light.dispose()
	}
}

