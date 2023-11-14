
import {html} from "@benev/slate"
import {ItemMeta} from "../../../utils/metas.js"
import {slate} from "../../../../../context/slate.js"
import {Item} from "../../../../../context/domains/outline2/types/item.js"
import {OutlinerHoverIntent} from "../../../../../context/controllers/drop_coordinator/parts/outliner_drag_drop.js"

export const Dropzone = slate.light_view(_use => (
		{dnd, item, folderStates}: ItemMeta,
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

	function folder_allows_drop_below(item: Item.Container) {
		if (item.children.length === 0)
			return true
		else
			return !folderStates.obtain(item.id).opened
	}

	return html`
		<div
			class=dropzone
			?data-drop-hover="${is_hovering_over}"
			data-drop-mode="${dnd.hovering?.mode}">

			${item.kind === "container"
				? html`
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

