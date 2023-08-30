
import {TemplateResult, html} from "lit"

import {Layout} from "./layout.js"
import {alternator} from "./alternator.js"
import {LayoutMachine} from "./layout_machine.js"

export function sizing_styles(size: number | undefined) {
	return size
		? `flex: 0 0 ${size}%;`
		: `flex: 1 1 100%;`
}

export function recursively_render_layout(
		machine: LayoutMachine,
		node: Layout.Node,
		path: number[] = [],
	): TemplateResult | void {

	const {CellView, PaneView, LeafView} = machine.views

	switch (node.kind) {

		case "cell":
			return CellView({
				props: [{vertical: node.vertical}],
				attributes: {style: sizing_styles(node.size)},
				content: html`${
					alternator(
						node.children,
						(child, index) => recursively_render_layout(
							machine,
							child,
							[...path, index],
						),
						(child, index) => {
							return html`
								<div class=resizer @click=${() => {
									child.size = child.size
										? child.size + 1
										: child.size
									machine.update()
								}}></div>
							`
						},
					)
				}`
			})

		case "pane":
			return PaneView({
				props: [],
				attributes: {style: sizing_styles(node.size)},
				content: html`${
					node.children.map((leaf, index): any =>
						recursively_render_layout(
							machine,
							leaf,
							[...path, index],
						)
					)
				}`
			})

		case "leaf":
			const name = `leaf-${path.join('-')}`
			return LeafView({
				props: [],
				content: html`<slot name="${name}"></slot>`,
			})
	}
}

