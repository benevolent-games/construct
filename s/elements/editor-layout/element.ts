
import {TemplateResult, html} from "lit"
import {QuickElement} from "@benev/frog"

import {style} from "./style.css.js"
import {Layout} from "./parts/layout.js"
import {PaneView} from "./views/pane.js"
import {CellView} from "./views/cell.js"
import {component} from "../component.js"
import {PlateView} from "./views/plate.js"
import {layout} from "./parts/default_layout.js"
import {contextualize} from "../../context/context.js"

export const EditorLayout = component(context => class extends QuickElement {
	static styles = style

	#views = contextualize(context)({
		CellView,
		PaneView,
		PlateView,
	})

	layout = layout

	#render_layout(node: Layout.Node, path: number[] = []): TemplateResult | void {
		const {CellView, PaneView, PlateView} = this.#views
		switch (node.kind) {

			case "cell":
				return CellView({
					props: [{vertical: node.vertical}],
					content: html`${
						node.children
							.map((child, index) => this.#render_layout(child, [...path, index]))
					}`
				})

			case "pane":
				return PaneView({
					props: [{size: node.size}],
					content: html`${
						node.children
							.map((plate, index) => this.#render_layout(plate, [...path, index]))
					}`
				})

			case "plate":
				const name = `plate-${path.join('-')}`
				return html`${PlateView({
					props: [],
					content: html`
						<slot name="${name}"></slot>
					`,
				})}`
		}
	}

	render() {
		return this.#render_layout(this.layout)
	}
})

