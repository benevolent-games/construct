
import {Signal} from "@benev/slate"
import {OutlineModel} from "./model.js"
import {Id} from "../../../tools/fresh_id.js"
import {OutlineState} from "./types/state.js"

export class OutlineAdmin extends OutlineModel {

	constructor(public state: OutlineState) {
		super(new Signal(state))
	}

	detach_refs_from_tree(...ids: Id[]) {
		const remove_ids = (id: Id) => !ids.includes(id)

		this.state.root = this.root.filter(remove_ids)

		for (const block of this.blocks) {
			if (block.childRefs)
				block.childRefs = block.childRefs.filter(remove_ids)
		}
	}

	discard_dead_data() {

		// TODO

		const orphans = this.orphaned_blocks
		this.state.root

		// const ids = this.orphans.map(item => item.id)
		// this.state.items = this.state.items
		// 	.filter(item => !ids.includes(item.id))

		// if (this.state.isolate) {
		// 	const isolated = this.find(this.state.isolate)
		// 	if (!isolated)
		// 		this.state.isolate = null
		// }
	}
}

