
import {Node} from "@babylonjs/core/node.js"
import {V3, v3} from "@benev/toolbox/x/utils/v3.js"
import {Quat, quat} from "@benev/toolbox/x/utils/quat.js"
import {Color4} from "@babylonjs/core/Maths/math.color.js"
import {AbstractMesh} from "@babylonjs/core/Meshes/abstractMesh.js"
import {TransformNode} from "@babylonjs/core/Meshes/transformNode.js"

import {BaseUnit} from "./base.js"
import {Id} from "../../../../tools/fresh_id.js"

export class InstanceUnit extends BaseUnit {
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

	// TODO questionable architecture requires
	// babylon interaction outside world
	setParent(node: Node | null) {
		this.#node.setParent(node)
	}

	hasMesh(mesh: AbstractMesh) {
		return this.#meshes.includes(mesh)
	}

	cleanup() {
		this.#node.dispose()
	}
}

