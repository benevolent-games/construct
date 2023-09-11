
import {html, css} from "lit"
import {ShaleView} from "@benev/slate"
import {view} from "../framework/frontend.js"

export const AboutLeaf = view(_ => class extends ShaleView {
	static styles = css``

	render() {
		return html`
			<p>ABOUT</p>
		`
	}
})

