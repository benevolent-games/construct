
import {html, css} from "lit"
import {view} from "../../view.js"

export const PaneView = view("pane", _ => ({

	render: _ => ({}: {size: number | undefined}) => {
		return html`
			<slot></slot>
		`
	},

	styles: css`
		:host {
			display: block;
		}
	`,
}))

