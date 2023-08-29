
import {html, css} from "lit"
import {view} from "../../frontend.js"

export const PaneView = view({
		name: "pane",
		views: {},
		styles: css`
			:host {
				display: block;
			}
		`,
	}).render(_context => _views => _use => ({size}: {
		size: number | undefined
	}) => {

	return html`
		<slot></slot>
	`
})

