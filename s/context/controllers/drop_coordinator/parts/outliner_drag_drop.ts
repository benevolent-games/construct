
import {Id} from "../../../../tools/fresh_id.js"
import {Edcore} from "../../edcore/controller.js"
import {ShockDragDrop} from "../../../../tools/shockdrop/drag_drop.js"

export type OutlinerGrab = {itemIds: Id[]}

export namespace OutlinerHoverIntent {
	export type Above = {mode: "above", itemId: Id}
	export type Into = {mode: "into", folderId: Id}
	export type Below = {mode: "below", itemId: Id}
	export type Any = Above | Into | Below
}

export class OutlinerDragDrop
	extends ShockDragDrop<OutlinerGrab, OutlinerHoverIntent.Any> {

	make_hover_intents(itemId: Id) {
		const above: OutlinerHoverIntent.Above = {mode: "above", itemId}
		const into: OutlinerHoverIntent.Into = {mode: "into", folderId: itemId}
		const below: OutlinerHoverIntent.Below = {mode: "below", itemId}
		return {
			above,
			into,
			below,
		}
	}

	constructor(edcore: Edcore) {
		super({
			handle_drop: (_event, grabbed, intent) => {
				const {itemIds} = grabbed!
				switch (intent.mode) {

					case "above":
						return edcore.actions.outline.move_above_another_item({
							itemIds,
							targetItemId: intent.itemId,
						})

					case "into":
						return edcore.actions.outline.move_into_folder({
							itemIds,
							folderId: intent.folderId,
						})

					case "below":
						return edcore.actions.outline.move_below_another_item({
							itemIds,
							targetItemId: intent.itemId,
						})
				}
			}
		})
	}
}

