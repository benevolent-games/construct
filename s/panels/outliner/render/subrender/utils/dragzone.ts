
import {html} from "@benev/slate"
import {ItemMeta} from "../../../utils/metas.js"
import {slate} from "../../../../../context/slate.js"

export const Dragzone = slate.light_view(_use => (
		{item, dnd}: ItemMeta,
	) => {

	const grabbedIds = dnd.grabbed?.itemIds ?? []

	return (!item.selected && grabbedIds.includes(item.id))
		? html`<div class=dragzone></div>`
		: undefined
})

