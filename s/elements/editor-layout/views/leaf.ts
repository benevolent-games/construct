
import {html, css} from "lit"
import {view} from "../../frontend.js"

export const LeafView = view({
		name: "leaf",
		views: {},
		styles: css`
			:host {
				display: block;
			}
		`,
	}).render(_context => _views => _use => () => {

	return html`
		<slot></slot>
	`
})

