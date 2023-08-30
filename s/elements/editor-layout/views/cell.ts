
import {html, css} from "lit"

import {view} from "../../frontend.js"
import {flip_attrs} from "../../../tools/flip_attrs.js"

export const CellView = view({
		name: "cell",
		views: {},
		styles: css`

			:host {
				display: flex;
				width: 100%;
				height: 100%;
			}

			:host([vertical]) {
				flex-direction: column;
				border: 2px solid #8f84;
			}

			::slotted(*) {
				flex: 0 0 auto;
			}

			::slotted(.resizer) {
				flex: 0 0 1em;
				background: yellow;
				cursor: ew-resize;
			}

			:host([vertical]) ::slotted(.resizer) {
				cursor: ns-resize;
			}
		`,
	}).render(_context => _views => use => ({vertical}: {vertical: boolean}) => {

	const attrs = flip_attrs<{vertical: string}>(use)
	attrs.boolean.vertical = vertical

	return html`
		<slot></slot>
	`
})

