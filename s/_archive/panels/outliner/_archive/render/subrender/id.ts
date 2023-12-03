
import {html} from "@benev/slate"
import {ItemMeta} from "../../utils/metas.js"

export function render_id(meta: ItemMeta, onclick = () => {}) {
	return html`
		<div class=id data-unnecessary @click=${onclick}>
			${meta.item.id.slice(0, 6)}
		</div>
	`
}

