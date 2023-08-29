
import {html} from "lit"

import {Layout} from "./layout.js"
import {LayoutViews} from "./layout_views.js"

export function recursively_render_layout(
		views: LayoutViews,
		node: Layout.Node,
		path: number[] = [],
	) {

	const {CellView, PaneView, LeafView} = views

	switch (node.kind) {

		case "cell":
			return CellView({
				props: [{vertical: node.vertical}],
				content: html`${
					node.children.map((child, index): any =>
						recursively_render_layout(
							views,
							child,
							[...path, index],
						)
					)
				}`
			})

		case "pane":
			return PaneView({
				props: [],
				attributes: {
					style: (node.size
						? (`
							flex-basis: ${node.size}%;
							flex-grow: 0;
						`)
						: (`
							flex-basis: auto;
						`)
					),
				},
				content: html`${
					node.children.map((leaf, index): any =>
						recursively_render_layout(
							views,
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

