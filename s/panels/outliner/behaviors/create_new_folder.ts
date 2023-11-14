
import {Id, freshId} from "../../../tools/fresh_id.js"
import {OutlineActions} from "../../../context/domains/outline2/actions.js"

export function create_new_folder(
		actions: OutlineActions,
		into: Id | null,
	) {

	actions.items.add({
		into,
		item: {
			id: freshId(),
			kind: "container",
			name: "folder",
			selected: false,
			visible: true,
			spatial: null,
			children: [],
		},
	})
}

