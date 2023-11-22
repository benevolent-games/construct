
import {Pojo} from "@benev/slate"
import {Id} from "../../../../tools/fresh_id.js"

export namespace Data {
	export type Block<P = any> = {
		id: Id
		kind: string
		name: string
		cargo: P
		childRefs: Id[] | null
	}

	export type Ref<P = any> = {
		id: Id
		blockId: Id
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

	export type BlockParamsFor<C extends Concept<any, any>> = (
		Parameters<C["block"]>
	)

	export type BlockCargoFor<C extends Concept<any, any>> = (
		ReturnType<C["block"]>
	)

	export type BlockFor<C extends Concept<any, any>> = (
		Block<ReturnType<C["block"]>>
	)

	export type RefParamsFor<C extends Concept<any, any>> = (
		Parameters<C["ref"]>
	)

	export type RefPayloadFor<C extends Concept<any, any>> = (
		ReturnType<C["ref"]>
	)

	export type RefFor<C extends Concept<any, any>> = (
		Ref<ReturnType<C["ref"]>>
	)

	export function concept<C extends Concept<any, any>>(c: C) {
		return c
	}

	export type Concepts = Pojo<Concept<any, any>>

	export type Schema<C extends Concepts> = {
		[K in keyof C]: {
			block: BlockFor<C[K]>
			ref: RefFor<C[K]>
		}
	}

	export type Report = {
		ref: Ref
		block: Block
		otherRefs: Ref[]
	}
}

