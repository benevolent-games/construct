
import {html} from "lit"
import {LightElement} from "@benev/frog"

import {TreeView} from "./views/tree.js"
import {component} from "../component.js"
import {default_layout} from "./parts/default_layout.js"

export const EditorLayout = component(context => class extends LightElement {
	#TreeView = TreeView(context)
	layout = default_layout

	render() {
		return this.#TreeView({
			props: [this.layout],
			content: html`
				<p slot="plate-0-0-0">hello</p>
				<p slot="plate-1-0-0">world</p>
			`,
		})
	}
})

