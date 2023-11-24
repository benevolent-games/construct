
import {Pojo} from "@benev/slate"
import {Id} from "../../../../tools/fresh_id.js"

type Key = string | symbol | number

export namespace Data {
	export type Block<C = any> = {
		id: Id
		kind: Key
		name: string
		cargo: C
		childReferences: Id[] | null
	}

	export type Reference<C = any> = {
		id: Id
		blockId: Id
		name: string
		cargo: C
	}

	export type Report = {
		reference: Reference
		block: Block
		otherReferences: Reference[]
	}

	//////////////////////////

	export type Cargoes<BC extends {}, RC extends {}> = {
		block: BC
		reference: RC
	}

	export type Concepts = Pojo<Cargoes<{}, {}>>

	export type AsConcepts<C extends Pojo<Cargoes<{}, {}>>> = C

	export type Config<C extends Concepts> = {
		[K in keyof C]: {
			allowChild?: (
				parentBlock: Block,
				childBlock: Block,
				childReference: Reference,
			) => boolean
		}
	}
}

