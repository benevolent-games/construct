
import {Signal} from "@benev/slate"
import {Item} from "./types/item.js"
import {OutlineState} from "./types/state.js"
import {Id} from "../../../tools/fresh_id.js"

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

	get items() {
		return this.#state.items
	}

	get isolate() {
		return this.#state.isolate
	}

	find(id: Id) {
		return this.#state.items.find(item => item.id === id)
	}

	get(id: Id) {
		const item = this.find(id)
		if (!item)
			throw new Error(`outliner item "${id}" not found`)
		return item
	}

	getItems(...ids: Id[]) {
		return this.#state.items.filter(item => ids.includes(item.id))
	}

	getContainer(id: Id) {
		return this.get(id) as Item.Container
	}

	getProp(id: Id) {
		return this.get(id) as Item.Prop
	}

	getLight(id: Id) {
		return this.get(id) as Item.Light
	}

	get reports() {
		const recurse = (ids: Id[], parents: Item.Container[]): Item.Report[] => {
			return ids.flatMap(id => {
				const item = this.get(id)
				const report: Item.Report = {item, parents}
				return (item.kind === "container")
					? [report, ...recurse(item.children, [...parents, item])]
					: [report]
			})
		}
		return recurse(this.#state.root, [])
	}

	getParentalArray(report: Item.Report) {
		return report.parents.length
			? report.parents.at(-1)!.children
			: this.root
	}

	get containers() {
		return this.#state.items
			.filter(item => item.kind === "container") as Item.Container[]
	}

	get props() {
		return this.#state.items
			.filter(item => item.kind === "prop") as Item.Prop[]
	}

	get lights() {
		return this.#state.items
			.filter(item => item.kind === "light") as Item.Light[]
	}

	findReport(id: Id) {
		return this.reports.find(report => report.item.id === id)
	}

	getReport(id: Id) {
		const report = this.findReport(id)
		if (!report)
			throw new Error(`outliner report not found "${id}"`)
		return report
	}

	getParent(id: Id) {
		const report = this.getReport(id)
		return report.parents.at(-1)
	}

	isAtRootLevel(id: Id) {
		return this.#state.root.includes(id)
	}

	get orphans() {
		const attached = this.reports.map(report => report.item.id)
		return this.#state.items.filter(item => !attached.includes(item.id))
	}
}

