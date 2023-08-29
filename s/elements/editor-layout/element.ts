
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
				<p slot="leaf-0-0-0">alpha</p>
				<p slot="leaf-0-0-1">bravo</p>
				<p slot="leaf-1-0-0">charlie</p>
				<p slot="leaf-2-0-0">delta</p>
				<p slot="leaf-2-1-0">echo</p>
			`,
		})
	}
})

