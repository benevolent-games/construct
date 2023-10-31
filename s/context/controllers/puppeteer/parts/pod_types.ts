
import {AbstractMesh} from "@babylonjs/core/Meshes/abstractMesh.js"

import {Id} from "../../../../tools/fresh_id.js"
import {Item} from "../../../domains/outline/types.js"

export namespace Pod {
	export type Kind = "instance" | "light"

	export interface Base {
		kind: Kind
		id: Id
		apparent: boolean
		selected: boolean
		dispose: () => void
	}

	export interface Instance extends Base {
		kind: "instance"
		glb_hash: string
		meshes: AbstractMesh[]
	}

	export interface Light extends Base {
		kind: "light"
	}

	export type Whatever = Instance | Light
	export type SourceItem = Item.Instance | Item.Light
}

