
import {ItemMeta} from "../../utils/metas.js"
import {TemplateResult, html} from "@benev/slate"

export function render_gripbox(meta: ItemMeta, content: TemplateResult) {
	const {dnd} = meta
	const itemId = meta.item.id

	return meta.isRoot ? html`
		<div class=gripbox>
			${content}
		</div>
	` : html`
		<div
			class=gripbox
			draggable=true
			@dragstart=${dnd.dragzone.dragstart({itemIds: [itemId]})}
			@dragend=${dnd.dragzone.dragend()}>
			${content}
		</div>
	`
}

