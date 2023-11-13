
import {Spatial} from "./spatial.js"
import {Id} from "../../../tools/fresh_id.js"
import {V3} from "@benev/toolbox/x/utils/v3.js"
import {PropAddress} from "../../controllers/world/warehouse/parts/types.js"

export namespace Item {
	export type Kind = (
		| "folder"
		| "instance"
		| "light"
		| "placement"
	)

	export type FolderSubtype = (
		| "root"
		| "subroot"
		| "scene"
		| "subscene"
		| "arrangement"
	)

	export interface Base {
		kind: Kind
		id: Id
		name: string
		selected: boolean
	}

	export interface Folder extends Base {
		kind: "folder"
		subtype: FolderSubtype
		children: Anything[]
	}

	export interface Manifestation extends Base {
		visible: boolean
		spatial: Spatial
	}

	export type RootChild = SubrootFolder | Scene
	export type ArrangementChild = SubsceneFolder | Instance | Light
	export type SceneChild = ArrangementFolder | ArrangementChild

	//////
	//////
	//////

	export interface Root extends Folder {
		folder: "root"
		children: RootChild[]
		selected: false
	}

	export interface SubrootFolder extends Folder {
		subtype: "subroot"
		children: RootChild[]
	}

	export interface Scene extends Folder {
		subtype: "scene"
		children: SceneChild[]
	}

	export interface SubsceneFolder extends Folder {
		subtype: "subscene"
		children: SceneChild[]
	}

	export interface ArrangementFolder extends Folder {
		subtype: "arrangement"
		children: ArrangementChild[]
		pivot: V3
	}

	export interface Instance extends Manifestation {
		kind: "instance"
		address: PropAddress
	}

	export interface Light extends Manifestation {
		kind: "light"
	}

	export interface Placement extends Manifestation {
		kind: "placement"
	}

	export type Anything = Root | Scene | Folder | Instance | Light | Placement

	//////
	//////
	//////

	export type Report = {
		item: Item.Anything
		parent: Item.Folder
		parents: Item.Folder[]
	}
}

