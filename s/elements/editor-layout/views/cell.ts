
import {html, css} from "lit"

import {view} from "../../view.js"
import {flip_attrs} from "../../../tools/flip_attrs.js"

export const CellView = view("cell", _ => ({

	render: use => ({vertical}: {vertical: boolean}) => {
		const attrs = flip_attrs<{vertical: string}>(use)
		attrs.boolean.vertical = vertical

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

		:host([vertical]) {
			flex-direction: column;
			border: 2px solid #8f84;
		}
	`,
}))

