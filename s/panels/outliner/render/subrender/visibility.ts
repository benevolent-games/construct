
import {html} from "@benev/slate"
import {ItemMeta} from "../../utils/metas.js"
import {toggle_visibility} from "../../behaviors/toggle_visibility.js"
import {icon_tabler_eye} from "../../../../icons/groups/tabler/eye.js"
import {icon_tabler_eye_closed} from "../../../../icons/groups/tabler/eye-closed.js"

export function render_visibility(meta: ItemMeta) {
	return html`
		<button
			class=visibility
			?data-visible="${meta.item.visible}"
			@click="${() => toggle_visibility(meta)}">
				${meta.item.visible
					? icon_tabler_eye
					: icon_tabler_eye_closed}
		</button>
	`
}

