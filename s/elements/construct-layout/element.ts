
import {QuickElement} from "@benev/frog"
import {TemplateResult, html} from "lit"

import {styles} from "./styles.css.js"
import {Layout} from "./parts/layout.js"
import {component} from "../frontend.js"
import {alternator} from "./parts/alternator.js"
import {default_layout} from "./parts/default_layout.js"

export const ConstructLayout = component(_ => class extends QuickElement {
	static styles = styles
	#layout = default_layout()

	#sizing_styles(size: number | undefined) {
		return size
			? `flex: 0 0 ${size}%;`
			: `flex: 1 1 100%;`
	}

	#render_layout(node: Layout.Node, path: number[] = []): TemplateResult | void {
		switch (node.kind) {

			case "cell": {
				return html`
					<div
						class=cell
						?data-vertical=${node.vertical}
						style="${this.#sizing_styles(node.size)}">

						${alternator(
							node.children,
							(child, index) => this.#render_layout(child,[...path, index]),
							(child, _index) => html`
								<div class=resizer @click=${() => {
									child.size = child.size
										? child.size + 1
										: child.size
									this.requestUpdate()
								}}></div>
							`,
						)}
					</div>
				`
			}

			case "pane": {
				return html`
					<div
						class=pane
						style="${this.#sizing_styles(node.size)}">

						${node.children.map(
							(leaf, index) => this.#render_layout(leaf, [...path, index])
						)}
					</div>
				`
			}

			case "leaf": {
				return html`
					<div class=leaf>
						<slot name="${`leaf-${path.join('-')}`}"></slot>
					</div>
				`
			}
		}
	}

	render() {
		return this.#render_layout(this.#layout)
	}
})

