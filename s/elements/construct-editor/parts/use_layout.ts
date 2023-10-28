
import {UseCarbon, html, render} from "@benev/slate"

import {leaf_slot} from "./leaf_slot.js"
import {panels} from "../../../panels/panels.js"
import {Context} from "../../../context/context.js"
import {Layout} from "../../../context/controllers/layout/parts/types.js"

export const use_layout = (use: UseCarbon<Context>) => use.prepare(() => {
	const {seeker} = use.context.layout
	const leafRegistry = new Set<Layout.Id>()
	return {

		add_new_leaves() {
			const newLeaves = seeker
				.leaves
				.filter(leaf => !leafRegistry.has(leaf.id))

			for (const leaf of newLeaves) {
				const div = document.createElement("div")
				div.setAttribute("data-id", leaf.id.toString())
				div.setAttribute("slot", leaf_slot(leaf.id))

				const {view} = panels[leaf.panel]
				const content = html`${view([{leafId: leaf.id}])}`

				render(content, div)
				use.element.appendChild(div)

				leafRegistry.add(leaf.id)
			}
		},

		delete_old_leaves() {
			const allLeaves = seeker.leaves
			const oldLeaves = [...leafRegistry]
				.filter(id => !allLeaves.some(leaf => leaf.id === id))

			for (const id of oldLeaves) {
				const div = use
					.element
					.querySelector<HTMLElement>(`[data-id="${id}"]`)

				if (div)
					div.remove()

				leafRegistry.delete(id)
			}
		},
	}
})

