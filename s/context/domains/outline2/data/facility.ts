
import {Data} from "./namespace.js"
import {Id, freshId} from "../../../../tools/fresh_id.js"

export type ConceptsFromFacility<F extends DataFacility<any>> = (
	F extends DataFacility<infer C>
		? C
		: never
)

export class DataFacility<C extends Data.Concepts> {
	#concepts: C

	constructor(concepts: C) {
		this.#concepts = concepts
	}

	get kinds() {
		return Object.keys(this.#concepts) as any as keyof C
	}

	#getConcept<K extends keyof C>(kind: K): C[K] {
		return this.#concepts[kind]
	}

	block<K extends keyof C>(
			{kind, name}: {
				kind: K
				name: string
			},
			...p: Parameters<C[K]["block"]>
		): Data.BlockFor<C[K]> {
		const concept = this.#getConcept(kind)
		const cargo = concept.block(...p) as Data.BlockCargoFor<C[K]>
		return {
			id: freshId(),
			kind: kind as string,
			name,
			cargo,
			childRefs: concept.children
				? []
				: null,
		}
	}

	ref<K extends keyof C>(
			{kind, label, blockId}: {
				kind: K
				label: string
				blockId: Id
			},
			...p: Parameters<C[K]["block"]
		>): Data.RefFor<C[K]> {
		const concept = this.#getConcept(kind)
		const payload = concept.ref(...p) as Data.RefPayloadFor<C[K]>
		return {
			id: freshId(),
			label,
			payload,
			blockId: blockId,
		}
	}

	add_child_to_block(
			parentBlock: Data.Block<any>,
			childBlock: Data.Block<any>,
			childRef: Data.Ref<any>,
		) {
		const concept = this.#concepts[parentBlock.kind]
		const parent_block_is_valid = concept.children && parentBlock.childRefs
		const child_is_allowed = concept.children!.allowChild(childBlock, childRef)

		if (parent_block_is_valid && child_is_allowed) {
			parentBlock.childRefs!.push(childRef.id)
			return true
		}

		return false
	}
}

