
import {watch} from "@benev/slate"
import {V3} from "@benev/toolbox/x/utils/v3.js"

import {Outline} from "./controller.js"
import {Data} from "../../domains/outline2/data/namespace.js"
import {PropAddress} from "../world/warehouse/parts/types.js"
import {Spatial} from "../../domains/outline2/types/spatial.js"
import {OutlineModel} from "../../domains/outline2/model/model.js"
import {OutlineState} from "../../domains/outline2/types/state.js"
import {DataFacility} from "../../domains/outline2/data/facility.js"
import {editorVisions} from "../../../panels/outliner/editor/visions.js"
import {OutlinerVisions} from "../../../panels/outliner/editor/types.js"

export class EditorOutline implements Outline {
	model: OutlineModel<EditorConcepts>
	facility: DataFacility<EditorConcepts>
	visions: OutlinerVisions<EditorConcepts>

	constructor(outline_state: OutlineState<EditorConcepts>) {
		this.model = new OutlineModel<EditorConcepts>(
			watch.computed(() => outline_state)
		)

		this.facility = new DataFacility<EditorConcepts>({
			folder: {allowChild: () => true},
			prop: {},
			light: {},
		})

		this.visions = editorVisions
	}
}

///////////////////////

export type EditorConcepts = Data.AsConcepts<{
	folder: {
		block: {}
		reference: {spatial: null | Spatial}
	}

	prop: {
		block: {propAddress: PropAddress}
		reference: {spatial: Spatial}
	}

	light: {
		block: {
			type: "point"
			intensity: number
			color: V3
		}
		reference: {spatial: Spatial}
	}
}>

