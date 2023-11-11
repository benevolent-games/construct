
import {Tree} from "../../tree/controller.js"
import {Id} from "../../../../tools/fresh_id.js"
import {ShockDragDrop} from "../../../../tools/shockdrop/drag_drop.js"

type Grabbed = {itemId: Id}
type HoveringInto = {mode: "into", folderId: Id}
type HoveringBelow = {mode: "below", itemId: Id}
type Hovering = HoveringInto | HoveringBelow

export class OutlinerDrops {
	constructor(private tree: Tree) {}

	dnd = new ShockDragDrop<Grabbed, Hovering>({
		handle_drop: (_event, grabbed, hovering) => {
			const itemId = grabbed!.itemId
			if (hovering.mode === "into")
				this.tree.actions.items.move_into_folder({
					itemIds: [itemId],
					folderId: hovering.folderId,
				})
			else
				this.tree.actions.items.move_below_another_item({
					itemIds: [itemId],
					targetItemId: hovering.itemId,
				})
		}
	})

	make_hovering_data = (itemId: Id) => {
		const into: Hovering = {mode: "into", folderId: itemId}
		const below: Hovering = {itemId, mode: "below"}
		return {
			into,
			below,
		}
	}
}

