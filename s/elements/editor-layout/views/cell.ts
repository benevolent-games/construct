
import {css, html} from "lit"
import {view} from "../../view.js"

export const CellView = view("cell")
	.render(context => use => () => {
		return html`
			<slot></slot>
		`
	})
	.styles(css`
		:host {
			display: block;
		}
	`)

