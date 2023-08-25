
import {html} from "lit"

import {Layout} from "./layout.js"
import {Views} from "./layout_views.js"

export function recursively_render_layout(
		views: Views,
		node: Layout.Node,
		path: number[] = [],
	) {

	const {CellView, PaneView, PlateView} = views

	switch (node.kind) {

		case "cell":
			return CellView({
				props: [{vertical: node.vertical}],
				content: html`${
					node.children
						.map((child, index): any => recursively_render_layout(
							views,
							child,
							[...path, index],
						))
				}`
			})

		case "pane":
			return PaneView({
				props: [{size: node.size}],
				content: html`${
					node.children
						.map((plate, index): any => recursively_render_layout(
							views,
							plate,
							[...path, index],
						))
				}`
			})

		case "plate":
			const name = `plate-${path.join('-')}`
			return html`${PlateView({
				props: [],
				content: html`<slot name="${name}"></slot>`,
			})}`
	}
}

