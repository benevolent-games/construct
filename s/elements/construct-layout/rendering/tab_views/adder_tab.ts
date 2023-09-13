
import {html} from "lit"
import {ShaleView} from "@benev/slate"

import {tab_styles} from "./tab_styles.js"
import {AdderTabProps} from "./tab_prop_types.js"
import {view} from "../../../../framework/frontend.js"

export const AdderTab = view(_context => class extends ShaleView {
	static name = "tab adder"
	static styles = tab_styles

	render(tab: AdderTabProps) {
		return html``
	}
})

