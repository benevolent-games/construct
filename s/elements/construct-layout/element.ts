
import {QuickElement} from "@benev/frog"
import {TemplateResult, html} from "lit"

import {styles} from "./styles.css.js"
import {Layout} from "./parts/layout.js"
import {component} from "../frontend.js"
import {Resizer} from "./resize/resizer.js"
import {alternator} from "./parts/alternator.js"
import {sizing_styles} from "./parts/sizing_styles.js"
import {default_layout} from "./parts/default_layout.js"

export const ConstructLayout = component(_ => class extends QuickElement {
	static styles = styles

	#layout = default_layout()
	#resizer = new Resizer(() => this.requestUpdate())

	#render_cell(node: Layout.Cell, path: number[]) {
		return html`
			<div
				class=cell
				?data-vertical=${node.vertical}
				style="${sizing_styles(node.size)}">

				${alternator(
					node.children,
					(child, index) => (
						this.#render_layout(child,[...path, index])
					),
					(child, index) => html`
						<div
							class=resizer
							@pointerdown=${this.#resizer.start(node, child, index)}
						></div>
					`,
				)}
			</div>
		`
	}

	#render_pane(node: Layout.Cell | Layout.Pane, path: number[]) {
		return html`
			<div
				class=pane
				style="${sizing_styles(node.size)}">

				${node.children.map(
					(leaf, index) => (
						this.#render_layout(leaf, [...path, index])
					)
				)}
			</div>
		`
	}

	#render_leaf(path: number[]) {
		return html`
			<div class=leaf>
				<slot name="${`leaf-${path.join('-')}`}"></slot>
			</div>
		`
	}

	#render_layout(
			node: Layout.Node,
			path: number[] = [],
		): TemplateResult | void {
		switch (node.kind) {

			case "cell":
				return this.#render_cell(node, path)

			case "pane":
				return this.#render_pane(node, path)

			case "leaf":
				return this.#render_leaf(path)
		}
	}

	render() {
		return html`
			<div
				class=layout
				@pointermove=${this.#resizer.track_mouse_movement}
				@pointerup=${this.#resizer.end}>

				${this.#render_layout(this.#layout)}
			</div>
		`
	}
})

