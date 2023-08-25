
import {html} from "lit"
import {QuickElement} from "@benev/frog"

import {style} from "./style.css.js"
import {CellView} from "./views/cell.js"
import {component} from "../component.js"
import {layout} from "./parts/default_layout.js"
import {contextualize} from "../../context/context.js"

export const EditorLayout = component(context => class extends QuickElement {
	static styles = style
	layout = layout
	#views = contextualize(context)({
		CellView,
	})

	render() {
		const {CellView} = this.#views

		return html`
			${CellView({props: []})}
			<slot></slot>
		`
	}
})

