
import {V3} from "@benev/toolbox/x/utils/v3.js"

import {Data} from "./data/namespace.js"
import {Spatial} from "./types/spatial.js"
import {DataFacility} from "./data/facility.js"
import {PropAddress} from "../../controllers/world/warehouse/parts/types.js"

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

export const editorDataFacility = new DataFacility<EditorConcepts>({
	folder: {allowChild: () => true},
	prop: {},
	light: {},
})

