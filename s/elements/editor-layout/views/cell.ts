
import {html, css} from "lit"
import {view} from "../../view.js"

export const CellView = view("cell", _ => ({

	render: _ => ({}: {vertical: boolean}) => {
		return html`
			<slot></slot>
		`
	},

	styles: css`
		:host {
			display: flex;
			width: 100%;
			height: 100%;
			border: 2px solid #fff4;
		}
	`,
}))

