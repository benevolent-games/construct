
import {html, render} from "@benev/slate"

import {leaf_slot} from "./leaf_slot.js"
import {Id} from "../../../tools/fresh_id.js"
import {panels} from "../../../panels/panels.js"
import {miniSlate as slate} from "../../../context/mini_slate.js"

export const leaf_management = ({element}: {element: HTMLElement}) => () => {
	const {seeker} = slate.context.layout
	const leafRegistry = new Set<Id>()
	return {

		add_new_leaves() {
			const newLeaves = seeker
				.leaves
				.filter(leaf => !leafRegistry.has(leaf.id))

			for (const leaf of newLeaves) {
				const div = document.createElement("div")
				div.setAttribute("data-id", leaf.id.toString())
				div.setAttribute("slot", leaf_slot(leaf.id))

				const key = leaf.panel as any as keyof typeof panels

				if (!(key in panels))
					throw new Error(`unknown panel "${leaf.panel}"`)

				const {view} = panels[key]
				const content = html`${view([{leafId: leaf.id}])}`

				render(content, div)
				element.appendChild(div)

				leafRegistry.add(leaf.id)
			}
		},

		delete_old_leaves() {
			const allLeaves = seeker.leaves
			const oldLeaves = [...leafRegistry]
				.filter(id => !allLeaves.some(leaf => leaf.id === id))

			for (const id of oldLeaves) {
				const div = element
					.querySelector<HTMLElement>(`[data-id="${id}"]`)

				if (div)
					div.remove()

				leafRegistry.delete(id)
			}
		},
	}
}

