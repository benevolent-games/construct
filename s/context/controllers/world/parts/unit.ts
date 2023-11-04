
import {V3, v3} from "@benev/toolbox/x/utils/v3.js"
import {Light} from "@babylonjs/core/Lights/light.js"
import {AbstractMesh} from "@babylonjs/core/Meshes/abstractMesh.js"
import {TransformNode} from "@babylonjs/core/Meshes/transformNode.js"

import {Id} from "../../../../tools/fresh_id.js"
import {Quat, quat} from "@benev/toolbox/x/utils/quat.js"
import {Color4} from "@babylonjs/core/Maths/math.color.js"

export namespace Unit {
	export abstract class Base {
		constructor(public readonly id: Id) {}
		abstract cleanup(): void
	}

	export class Instance extends Base {
		#node: TransformNode
		#meshes: AbstractMesh[]

		constructor(
				id: Id,
				node: TransformNode,
				meshes: AbstractMesh[],
			) {
			super(id)
			this.#node = node
			this.#meshes = meshes
		}

		get hidden() {
			return this.#meshes.every(m => !m.isVisible)
		} set hidden(hide: boolean) {
			for (const mesh of this.#meshes)
				mesh.isVisible = !hide
		}

		get position() {
			return v3.fromBabylon(this.#node.position)
		} set position(vector: V3) {
			this.#node.position.set(...vector)
		}

		get rotation() {
			return quat.fromBabylon(this.#node.absoluteRotationQuaternion)
		} set rotation(quaternion: Quat) {
			this.#node.rotationQuaternion = this.#node.rotationQuaternion
				? this.#node.rotationQuaternion.set(...quaternion)
				: quat.toBabylon(quaternion)
		}

		get scale() {
			return v3.fromBabylon(this.#node.scaling)
		} set scale(vector: V3) {
			this.#node.scaling.set(...vector)
		}

		#selected = false
		get selected() {
			return this.#selected
		} set selected(value: boolean) {
			this.#selected = value
			for (const mesh of this.#meshes) {
				if (value) {
					mesh.enableEdgesRendering()
					mesh.edgesWidth = 8
					mesh.edgesColor = new Color4(1, 1, 0, 1)
				}
				else {
					mesh.disableEdgesRendering()
				}
			}
		}

		cleanup() {
			this.#node.dispose()
		}
	}

	export class Lamp extends Base {
		#light: Light

		constructor(id: Id, light: Light) {
			super(id)
			this.#light = light
		}

		cleanup() {
			this.#light.dispose()
		}
	}

	export type Whatever = Instance | Lamp
}

