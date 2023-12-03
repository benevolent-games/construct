
import {ItemMeta} from "../../utils/metas.js"
import {TemplateResult, html} from "@benev/slate"

export function render_gripbox(meta: ItemMeta, content: TemplateResult) {
	const {dnd} = meta

	function dragstart(event: DragEvent) {
		const selectedIds = meta.outline.selected.map(selected => selected.id)
		const itemIds = [...new Set([meta.item.id, ...selectedIds])]
		dnd.dragzone.dragstart({itemIds})(event)
	}

	return html`
		<div
			class=gripbox
			draggable=true
			@dragstart=${dragstart}
			@dragend=${dnd.dragzone.dragend()}>
			${content}
		</div>
	`
}

