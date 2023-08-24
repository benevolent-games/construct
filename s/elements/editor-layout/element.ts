
import {html} from "lit"
import {QuickElement} from "@benev/frog"

import {views} from "./views.js"
import {style} from "./style.css.js"
import {component} from "../component.js"
import {layout} from "./parts/default_layout.js"

export const EditorLayout = component(context => class extends QuickElement {
	static styles = style
	#views = views(context)
	layout = layout

	render() {
		const {CellView} = this.#views

		return html`
			${CellView({props: []})}
			<slot></slot>
		`
	}
})

