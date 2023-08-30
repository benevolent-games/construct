
import {html} from "lit"
import {LightElement} from "@benev/frog"

import {styles} from "./styles.css.js"
import {TreeView} from "./views/tree.js"
import {component} from "../frontend.js"
import {LayoutMachine, layout_views} from "./parts/layout_machine.js"

export const EditorLayout = component.views({
		TreeView,
		...layout_views,
	}).element(_ => views => class extends LightElement {

	static styles = styles

	machine = new LayoutMachine(views, () => this.requestUpdate())

	render() {
		return views.TreeView({
			props: [this.machine],
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

