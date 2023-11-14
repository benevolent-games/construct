
import {V3} from "@benev/toolbox/x/utils/v3.js"

import {Spatial} from "./spatial.js"
import {Id} from "../../../../tools/fresh_id.js"
import {PropAddress} from "../../../controllers/world/warehouse/parts/types.js"

export namespace Data {
	export type Block<P = any> = {
		id: Id
		kind: string
		name: string
		cargo: P

		// ref id array
		children: Id[] | null
	}

	export type Ref<P = any> = {
		id: Id
		block: Id
		label: string
		payload: P
	}

	export type Init<P = any> = (...p: any[]) => P

	export type Concept<Cargo, Payload> = {
		block: Init<Cargo>
		ref: Init<Payload>
		children?: {
			allowChild: (block: Block, ref: Ref) => boolean
		}
	}

	export type BlockFor<C extends Concept<any, any>> = (
		Block<ReturnType<C["block"]>>
	)

	export type RefFor<C extends Concept<any, any>> = (
		Ref<ReturnType<C["ref"]>>
	)

	export function concept<C extends Concept<any, any>>(c: C) {
		return c
	}

	export const prepare = (d: any) => {}
}

export const folder = Data.concept({
	block: () => ({}),
	ref: ({spatial}: {spatial: null | Spatial}) => ({
		spatial,
	}),
	children: {
		allowChild: (_block, _ref) => true,
	},
})

export const prop = Data.concept({
	block: ({propAddress}: {propAddress: PropAddress}) => ({
		propAddress,
	}),
	ref: ({spatial}: {spatial: Spatial}) => ({
		spatial,
	}),
})

export const light = Data.concept({
	block: ({type, intensity, color}: {type: "point", intensity: number, color: V3}) => ({
		type,
		color,
		intensity,
	}),
	ref: ({spatial}: {spatial: Spatial}) => ({
		spatial,
	}),
})

