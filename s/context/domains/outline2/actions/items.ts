
import {Item} from "../types/item.js"
import {actionate} from "../../actionate.js"
import {Id} from "../../../../tools/fresh_id.js"

export const outline_item_actions = actionate.outline2.blueprint(action => ({

	add: action(outline => (...additions: {
			item: Item.Whatever,
			into: Id | null,
		}[]) => {

		for (const {item, into} of additions) {
			outline.state.items.push(item)
			if (into) {
				const container = outline.getContainer(into)
				container.children.push(item.id)
			}
			else {
				outline.state.root.push(item.id)
			}
		}
	}),

	delete: action(outline => (...ids: Id[]) => {
		outline.detach_item_from_tree(...ids)
		outline.discard_dead_data()
	}),
}))

