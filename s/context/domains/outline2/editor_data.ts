
import {V3} from "@benev/toolbox/x/utils/v3.js"

import {Data} from "./data/namespace.js"
import {Spatial} from "./types/spatial.js"
import {ConceptsFromFacility, DataFacility} from "./data/facility.js"
import {PropAddress} from "../../controllers/world/warehouse/parts/types.js"

export type EditorDataFacility = typeof editorDataFacility
export type EditorSchema = Data.Schema<ConceptsFromFacility<EditorDataFacility>>

export type EditorKind = keyof EditorSchema
export type EditorBlock = EditorSchema[keyof EditorSchema]["block"]
export type EditorRef = EditorSchema[keyof EditorSchema]["ref"]

export const editorDataFacility = new DataFacility({
	folder: Data.concept({
		block: () => ({}),
		ref: (payload: {spatial: null | Spatial}) => payload,
		children: {
			allowChild: (_block, _ref) => true,
		},
	}),

	prop: Data.concept({
		block: (cargo: {propAddress: PropAddress}) => cargo,
		ref: (payload: {spatial: Spatial}) => payload,
	}),

	light: Data.concept({
		block: (cargo: {
			type: "point"
			intensity: number
			color: V3
		}) => cargo,
		ref: (payload: {spatial: Spatial}) => payload,
	}),
})

