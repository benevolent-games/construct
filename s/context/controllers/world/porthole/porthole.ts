
import {V2} from "@benev/toolbox/x/utils/v2.js"
import {AbstractMesh} from "@babylonjs/core/Meshes/abstractMesh.js"

import {magic} from "../magic.js"
import {Id} from "../../../../tools/fresh_id.js"
import {CleanInitiator} from "./parts/clean_initiator.js"
import {ray_for_picking_on_canvas} from "./parts/ray_for_picking_on_canvas.js"
import {Babylon} from "../../../../context/controllers/world/babylon/babylon.js"
import {make_fly_camera} from "@benev/toolbox/x/babylon/flycam/make_fly_camera.js"

export class Porthole extends CleanInitiator {
	#babylon: Babylon
	#fly: ReturnType<typeof make_fly_camera>
	#find_id_for_mesh: (mesh: AbstractMesh) => (Id | undefined)

	constructor(
			public readonly leafId: Id,
			public readonly canvas: HTMLCanvasElement,
			babylon: Babylon,
			find_id_for_mesh: (mesh: AbstractMesh) => (Id | undefined),
		) {

		super()
		this.#babylon = babylon
		this.#find_id_for_mesh = find_id_for_mesh

		this.#fly = make_fly_camera({
			scene: babylon.scene,
			position: [0, 0, -50],
		})

		babylon.scene.addCamera(this.#fly.camera)

		babylon.engine.registerView(
			canvas,
			this.#fly.camera,
		)

		this.cleanup(() => this.#fly.dispose)
		this.cleanup(() => babylon.engine.unRegisterView(canvas))
	}

	;[magic] = {
		get_camera: () => {
			return this.#fly.camera
		},
	}

	add_look(vector: V2) {
		this.#fly.add_look(vector)
	}

	add_move(vector: V2) {
		this.#fly.add_move(vector)
	}

	add_move_vertical(y: number) {
		this.#fly.add_move_vertical(y)
	}

	pick_on_canvas(coordinates: V2): Id | null {
		const pick = this.#babylon.scene.pickWithRay(
			ray_for_picking_on_canvas(
				this.#fly.camera,
				this.canvas,
				coordinates,
			)
		)

		return (
			pick &&
			pick.hit &&
			pick.pickedMesh &&
			this.#find_id_for_mesh(pick.pickedMesh)
		) || null
	}
}

