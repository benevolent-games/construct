
import {Signal} from "@benev/slate"

import {Data} from "./data/namespace.js"
import {Id} from "../../../tools/fresh_id.js"
import {OutlineState} from "./types/state.js"

export type WalkReport = {
	report: Data.Report
	parents: Data.Report[]
}

export class OutlineModel {
	#signal: Signal<OutlineState>

	constructor(data: Signal<OutlineState>) {
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

	get refs() {
		return this.#state.refs
	}

	block(id: Id) {
		const block = this.#state.blocks.find(block => block.id === id)
		if (!block)
			throw new Error(`block not found "${id}"`)
		return block
	}

	ref(id: Id) {
		const ref = this.#state.refs.find(reference => reference.id === id)
		if (!ref)
			throw new Error(`reference not found "${ref}"`)
		return ref
	}

	get relations() {
		const relations = new Map<Id, {block: Data.Block, refs: Data.Ref[]}>(
			this.blocks.map(block => [block.id, {block, refs: []}])
		)
		for (const ref of this.refs) {
			const relation = relations.get(ref.blockId)!
			relation.refs.push(ref)
		}
		return relations
	}

	all_refs_for_block(blockId: Id) {
		return this.refs.filter(ref => ref.blockId === blockId)
	}

	report(refId: Id): Data.Report {
		const ref = this.ref(refId)
		const block = this.block(ref.blockId)
		const otherRefs = this.all_refs_for_block(ref.blockId)
			.filter(r => r.id !== ref.id)
		return {block, ref, otherRefs}
	}

	get reports() {
		return this.refs.map(ref => this.report(ref.id))
	}

	get_specific_reports(...refIds: Id[]) {
		return refIds.map(refId => this.report(refId))
	}

	walk() {
		const results: WalkReport[] = []

		const recurse = (ids: Id[], parents: Data.Report[]) => {
			const reports = this.get_specific_reports(...ids)
			for (const report of reports) {
				results.push({report, parents})
				if (report.block.childRefs)
					recurse(report.block.childRefs, [...parents, report])
			}
		}

		recurse(this.root, [])
		return results
	}

	get orphaned_blocks() {
		return [...this.relations.values()]
			.filter(({refs}) => refs.length === 0)
			.map(({block}) => block)
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

