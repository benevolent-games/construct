
import {Signal} from "@benev/slate"

import {OutlineModel} from "./model.js"
import {Data} from "../data/namespace.js"
import {OutlineState} from "../types/state.js"
import {DataFacility} from "../data/facility.js"
import {Id, freshId} from "../../../../tools/fresh_id.js"

export class OutlineAdmin<C extends Data.Concepts> extends OutlineModel<C> {

	constructor(
			public state: OutlineState<C>,
			public facility: DataFacility<C>,
		) {
		super(new Signal(state))
	}

	create_block<K extends keyof C>(
			partial: {kind: K}
				& Omit<Data.Block<C[K]["block"]>, "id">
		) {

		const block = {
			...partial,
			id: freshId(),
		} satisfies Data.Block<C[K]["block"]>

		this.state.blocks.push(block)
		return block
	}

	create_reference<K extends keyof C>(
			partial: Omit<Data.Reference<C[K]["reference"]>, "id">
		) {

		const reference = {
			...partial,
			id: freshId(),
		} satisfies Data.Reference<C[K]["reference"]>

		this.state.references.push(reference)
		return reference
	}

	add_child_to_block({
			parentBlockId, childBlockId, childReferenceId,
		}: {
			parentBlockId: Id
			childBlockId: Id
			childReferenceId: Id
		}) {

		const parentBlock = this.block(parentBlockId)
		const childBlock = this.block(childBlockId)
		const childReference = this.reference(childReferenceId)
		const config = this.facility.getConfig(parentBlock.kind as keyof C)

		const allowed_to_add_child = (
			config.allowChild &&
			parentBlock.childReferences &&
			parentBlock.id !== childBlock.id &&
			config.allowChild(parentBlock, childBlock, childReference)
		)

		if (allowed_to_add_child)
			parentBlock.childReferences!.push(childReference.id)

		return allowed_to_add_child
	}

	detach_refs_from_tree(...ids: Id[]) {
		const remove_ids = (id: Id) => !ids.includes(id)
		this.state.root = this.root.filter(remove_ids)

		for (const block of this.blocks) {
			if (block.childReferences)
				block.childReferences = block.childReferences.filter(remove_ids)
		}

		this.discard_dead_data()
	}

	discard_dead_data() {
		const dead_ref_ids = this.orphaned_references.map(r => r.id)
		this.state.references.filter(r => !dead_ref_ids.includes(r.id))

		const dead_block_ids = this.orphaned_blocks.map(b => b.id)
		this.state.blocks.filter(b => !dead_block_ids.includes(b.id))
	}
}

