
import {html, css} from "lit"
import {FlipUseSetup, GroupProvideRequirement} from "@benev/frog"

import {view} from "../../view.js"
import {CellView} from "./cell.js"
import {PaneView} from "./pane.js"
import {PlateView} from "./plate.js"
import {Layout} from "../parts/layout.js"
import {Context, contextualize} from "../../../context/context.js"

const coreviews = {CellView, PaneView, PlateView}
type Views = GroupProvideRequirement<typeof coreviews>

function setup_views(context: Context): FlipUseSetup<Views> {
	return () => ({
		setdown: () => {},
		result: contextualize(context)(coreviews),
	})
}

function render_layout(views: Views, node: Layout.Node, path: number[] = []) {
	const {CellView, PaneView, PlateView} = views
	switch (node.kind) {

		case "cell":
			return CellView({
				props: [{vertical: node.vertical}],
				content: html`${
					node.children
						.map((child, index): any => render_layout(
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
						.map((plate, index): any => render_layout(
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
				content: html`
					<slot name="${name}"></slot>
				`,
			})}`
	}
}

export const TreeView = view("tree", context => ({
	render: use => (layout: Layout.Cell) => {
		const views = use.setup(setup_views(context))
		return render_layout(views, layout)
	},
	styles: css`
		:host {
			display: flex;
			width: 100%;
			height: 100%;
		}
	`,
}))

