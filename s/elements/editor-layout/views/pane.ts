
import {html, css} from "lit"
import {view} from "../../frontend.js"

export const PaneView = view({
		name: "pane",
		views: {},
		styles: css`
			:host {
				display: block;
				outline: 1px solid red;
			}
		`,
	}).render(_context => _views => _use => () => {

	return html`
		<slot></slot>
	`
})

