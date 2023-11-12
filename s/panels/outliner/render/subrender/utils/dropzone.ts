
import {html} from "@benev/slate"
import {ItemMeta} from "../../../utils/metas.js"
import {slate} from "../../../../../context/slate.js"
import {Item} from "../../../../../context/domains/outline/types.js"
import {OutlinerDragDrop, OutlinerHoverIntent} from "../../../../../context/controllers/drop_coordinator/parts/outliner_drag_drop.js"

export const Dropzone = slate.light_view(_use => (
		meta: ItemMeta,
		dnd: OutlinerDragDrop,
		item: Item.Whatever,
	) => {

	if (!dnd.grabbed)
		return

	const is_hovering_over = dnd.hovering && (
		dnd.hovering.mode === "into"
			? dnd.hovering.folderId === item.id
			: dnd.hovering.itemId === item.id
	)

	const intents = dnd.make_hover_intents(item.id)

	const indicator = (className: string, intent: OutlinerHoverIntent.Any) => html`
		<div
			class="${className}"
			@dragover=${dnd.dropzone.dragover(intent)}
			@drop=${dnd.dropzone.drop(intent)}
		></div>
	`

	function folder_allows_drop_below(item: Item.Folder) {
		if (item.children.length === 0)
			return true
		else
			return !meta.folderStates.obtain(item.id).opened
	}

	return html`
		<div
			class=dropzone
			?data-drag-hover="${is_hovering_over}"
			data-drag-mode="${dnd.hovering?.mode}">

			${item.kind === "folder"
				? meta.isRoot
					? html`
						${indicator("drop-into", intents.into)}
					`
					: html`
						${indicator("drop-above", intents.above)}
						${indicator("drop-into", intents.into)}
						${folder_allows_drop_below(item)
							? indicator("drop-below", intents.below)
							: null}
					`
				: html`
					${indicator("drop-above", intents.above)}
					${indicator("drop-below", intents.below)}
				`}
		</div>
	`
})

