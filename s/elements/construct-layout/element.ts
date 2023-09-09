
import {QuickElement} from "@benev/frog"
import {TemplateResult, html} from "lit"

import {styles} from "./styles.css.js"
import {Layout} from "./parts/layout.js"
import {component} from "../frontend.js"
import {Resizer} from "./resize/resizer.js"
import {alternator} from "./parts/alternator.js"
import {sizing_styles} from "./parts/sizing_styles.js"
import {default_layout} from "./parts/default_layout.js"
import {find_layout_node} from "./parts/find_layout_node.js"
import { grid_icon } from "../../icons/feather/grid.svg.js"

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

	#split = (pane: Layout.Pane, path: number[]) => (event: PointerEvent) => {
		if (event.button === 1) {
			const parent_path = path.slice(0, path.length - 1)
			const cell = find_layout_node<Layout.Cell>(this.#layout, parent_path)
			const pane_index = path.at(-1)!

			cell.children.splice(pane_index, 1, {
				kind: "cell",
				size: undefined,
				vertical: !cell.vertical,
				children: [pane, {
					kind: "pane",
					size: undefined,
					children: [],
				}],
			})

			this.requestUpdate()
		}
	}

	#render_pane(node: Layout.Pane, path: number[]) {
		return html`
			<div
				class=pane
				style="${sizing_styles(node.size)}"
				@pointerdown="${this.#split(node, path)}">

				${this.#render_tabs(node.children)}

				<div class=leaves>
					${node.children.map(
						(leaf, index) => (
							this.#render_leaf(leaf, [...path, index])
						)
					)}
				</div>
			</div>
		`
	}

	#render_tabs(leaves: Layout.Leaf[]) {
		return html`
			<div class=tabs>
				<div>test ${grid_icon}</div>
				${leaves.map((leaf, index) => html`
					<div class=tab>
						${index}
					</div>
				`)}
			</div>
		`
	}

	#render_leaf(_: Layout.Leaf, path: number[]) {
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
				return this.#render_leaf(node, path)
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

