
import {html} from "@benev/slate"
import {render_id} from "./id.js"
import {ItemMeta} from "../../utils/metas.js"
import {render_visibility} from "./visibility.js"

export function render_nonfolder_right_side(meta: ItemMeta) {
	return html`
		${render_id(meta)}
		<div class=spacer></div>
		${render_visibility(meta)}
	`
}

