
import {html} from "@benev/slate"

import {ItemMeta} from "../utils/metas.js"
import {render_gripbox} from "./subrender/gripbox.js"
import {render_line_item} from "./subrender/line_item.js"
import {OutlinerBehaviors} from "../utils/make_outliner_behaviors.js"
import {render_nonfolder_right_side} from "./subrender/nonfolder_right_side.js"
import {icon_tabler_vector_triangle} from "../../../icons/groups/tabler/vector-triangle.js"

export function render_instance(meta: ItemMeta, behaviors: OutlinerBehaviors) {
	const select = behaviors.click_for_item_selections(meta)

	return render_line_item(meta, html`

		${render_gripbox(meta, html`
			<div class=icon @click="${select}">
				${icon_tabler_vector_triangle}
			</div>

			<div class=name @click="${select}">
				${meta.item.name}
			</div>
		`)}

		${render_nonfolder_right_side(meta)}
	`)
}

