
import {html, css} from "lit"
import {view} from "../../view.js"

export const CellView = view("cell", context => ({

	render: use => () => {
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

