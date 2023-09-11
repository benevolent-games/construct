
import {html, css} from "lit"
import {ShaleView} from "@benev/slate"
import {view} from "../framework/frontend.js"

export const UnknownLeaf = view(_ => class extends ShaleView {
	static styles = css``

	render() {
		return html`
			<p>unknown</p>
		`
	}
})

