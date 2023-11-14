
import {Signal} from "@benev/slate"
import {OutlineModel} from "./model.js"
import {Id} from "../../../tools/fresh_id.js"
import {OutlineState} from "./types/state.js"

export class OutlineAdmin extends OutlineModel {
	constructor(public state: OutlineState) {
		super(new Signal(state))
	}

	detach_item_from_tree(...ids: Id[]) {
		const toDelete = this.reports
			.filter(report => ids.includes(report.item.id))

		for (const report of toDelete) {
			const parent = report.parents.at(-1)
			if (parent)
				parent.children = parent.children
					.filter(id => id !== report.item.id)
			else
				this.state.root = this.state.root
					.filter(id => id !== report.item.id)
		}
	}

	discard_orphans() {
		const ids = this.orphans.map(item => item.id)
		this.state.items = this.state.items
			.filter(item => !ids.includes(item.id))
	}
}

