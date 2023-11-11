
import {html} from "@benev/slate"

import {ItemMeta} from "../utils/metas.js"
import {render_gripbox} from "./subrender/gripbox.js"
import {render_line_item} from "./subrender/line_item.js"
import {render_nonfolder_right_side} from "./subrender/nonfolder_right_side.js"

export function render_light(meta: ItemMeta) {
	return render_line_item(meta, html`
		${render_gripbox(meta, html`
			<div class=name>${meta.item.name}</div>
		`)}
		${render_nonfolder_right_side(meta)}
	`)
}

