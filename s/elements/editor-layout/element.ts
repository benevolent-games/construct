
import {html} from "lit"
import {LightElement} from "@benev/frog"

import {styles} from "./styles.css.js"
import {TreeView} from "./views/tree.js"
import {component} from "../frontend.js"
import {default_layout} from "./parts/default_layout.js"

export const EditorLayout = component.views({
		TreeView,
	}).element(_ => views => class extends LightElement {

	static styles = styles

	layout = default_layout

	render() {
		return views.TreeView({
			props: [this.layout],
			content: html`
				<p slot="leaf-0-0-0">hello</p>
				<p slot="leaf-1-0-0">world</p>
			`,
		})
	}
})

