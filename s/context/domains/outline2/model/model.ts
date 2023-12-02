
import {Signal} from "@benev/slate"

import {Data} from "../data/namespace.js"
import {OutlineState} from "../types/state.js"
import {Id} from "../../../../tools/fresh_id.js"

export class OutlineModel<C extends Data.Concepts> {
	#signal: Signal<OutlineState<C>>

	constructor(data: Signal<OutlineState<C>>) {
		this.#signal = data
	}

	get #state() {
		return this.#signal.value
	}

	get root() {
		return this.#state.root
	}

	get blocks() {
		return this.#state.blocks
	}

	get references() {
		return this.#state.references
	}

	get isolation_report() {
		const {isolated} = this.#state
		return isolated
			? this.report(isolated)
			: null
	}

	block(id: Id) {
		const block = this.#state.blocks.find(block => block.id === id)
		if (!block)
			throw new Error(`block not found "${id}"`)
		return block
	}

	reference(id: Id) {
		const ref = this.#state.references.find(ref => ref.id === id)
		if (!ref)
			throw new Error(`reference not found "${ref}"`)
		return ref
	}

	get block_relations() {
		const relations = new Map<Id, {block: Data.Block, refs: Data.Reference[]}>(
			this.blocks.map(block => [block.id, {block, refs: []}])
		)
		for (const ref of this.references) {
			const relation = relations.get(ref.blockId)!
			relation.refs.push(ref)
		}
		return relations
	}

	all_references_for_block(blockId: Id) {
		return this.references.filter(ref => ref.blockId === blockId)
	}

	report(refId: Id): Data.Report {
		const reference = this.reference(refId)
		const block = this.block(reference.blockId)
		const otherReferences = this.all_references_for_block(reference.blockId)
			.filter(r => r.id !== reference.id)
		return {block, reference, otherReferences}
	}

	get reports() {
		return this.references.map(ref => this.report(ref.id))
	}

	get_specific_reports(...refIds: Id[]) {
		return refIds.map(refId => this.report(refId))
	}

	graph_from(...ids: Id[]) {
		const results: Data.GraphReport[] = []

		const recurse = (refIds: Id[], parents: Data.Report[]) => {
			for (const report of this.get_specific_reports(...refIds)) {
				results.push({...report, parents})
				if (report.block.childReferences)
					recurse(report.block.childReferences, [...parents, report])
			}
		}

		recurse(ids, [])
		return results
	}

	get graph() {
		return this.graph_from(...this.root)
	}

	get orphaned_references() {
		const {graph} = this
		return this.references.filter(reference =>
			!graph.some(report => report.reference.id === reference.id)
		)
	}

	get orphaned_blocks() {
		const {graph} = this
		return this.blocks.filter(block =>
			!graph.some(report => report.block.id === block.id)
		)
	}
}

// export class OutlineModel {
// 	#signal: Signal<OutlineState>

// 	constructor(data: Signal<OutlineState>) {
// 		this.#signal = data
// 	}

// 	//
// 	// state getters
// 	//

// 	get #state() {
// 		return this.#signal.value
// 	}

// 	get root() {
// 		return this.#state.root
// 	}

// 	get items() {
// 		return this.#state.items
// 	}

// 	get isolate() {
// 		return this.#state.isolate
// 	}

// 	//
// 	// derived getters
// 	//

// 	get rootItems() {
// 		return this.getItems(...this.root)
// 	}

// 	get selected() {
// 		return this.items.filter(item => item.selected)
// 	}

// 	get containers() {
// 		return this.#state.items
// 			.filter(item => item.kind === "container") as Item.Container[]
// 	}

// 	get props() {
// 		return this.#state.items
// 			.filter(item => item.kind === "prop") as Item.Prop[]
// 	}

// 	get lights() {
// 		return this.#state.items
// 			.filter(item => item.kind === "light") as Item.Light[]
// 	}

// 	//
// 	// questions and answers
// 	//

// 	isAtRootLevel(id: Id) {
// 		return this.#state.root.includes(id)
// 	}

// 	isSelected(id: Id) {
// 		return this.get(id).selected
// 	}

// 	isImplicitlySelected(id: Id) {
// 		const report = this.getReport(id)
// 		const chain = [...report.parents, report.item]
// 		return chain.some(item => item.selected)
// 	}

// 	isImplicityVisible(id: Id) {
// 		const report = this.getReport(id)
// 		const chain = [...report.parents, report.item]
// 		return chain.every(item => item.visible)
// 	}

// 	//
// 	// finders and getters
// 	//

// 	find(id: Id) {
// 		return this.#state.items.find(item => item.id === id)
// 	}

// 	get(id: Id) {
// 		const item = this.find(id)
// 		if (!item)
// 			throw new Error(`outliner item "${id}" not found`)
// 		return item
// 	}

// 	getItems(...ids: Id[]) {
// 		return this.#state.items.filter(item => ids.includes(item.id))
// 	}

// 	getContainer(id: Id) {
// 		return this.get(id) as Item.Container
// 	}

// 	getProp(id: Id) {
// 		return this.get(id) as Item.Prop
// 	}

// 	getLight(id: Id) {
// 		return this.get(id) as Item.Light
// 	}

// 	//
// 	// reports
// 	//

// 	get reports() {
// 		const recurse = (
// 				ids: Id[],
// 				parents: Item.Container[],
// 			): Item.Report[] => (
// 			ids.flatMap(id => {
// 				const item = this.get(id)
// 				const report: Item.Report = {item, parents}
// 				return (item.kind === "container")
// 					? [report, ...recurse(item.children, [...parents, item])]
// 					: [report]
// 			})
// 		)
// 		return recurse(this.#state.root, [])
// 	}

// 	findReport<I extends Item.Whatever = Item.Whatever>(id: Id) {
// 		return this.reports
// 			.find(report => report.item.id === id) as Item.Report<I>
// 	}

// 	getReport<I extends Item.Whatever = Item.Whatever>(id: Id) {
// 		const report = this.findReport(id)
// 		if (!report)
// 			throw new Error(`outliner report not found "${id}"`)
// 		return report as Item.Report<I>
// 	}

// 	getParent(id: Id) {
// 		const report = this.getReport(id)
// 		return report.parents.at(-1)
// 	}

// 	getParentalArray(report: Item.Report) {
// 		return report.parents.length
// 			? report.parents.at(-1)!.children
// 			: this.root
// 	}

// 	//
// 	// cleanups
// 	//

// 	get orphans() {
// 		const attached = this.reports.map(report => report.item.id)
// 		return this.#state.items.filter(item => !attached.includes(item.id))
// 	}
// }
