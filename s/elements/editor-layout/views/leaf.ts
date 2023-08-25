
import {html, css} from "lit"
import {view} from "../../view.js"

export const LeafView = view("leaf", _ => ({

	render: _ => () => {
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

