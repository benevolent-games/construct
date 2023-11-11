
import {ItemMeta} from "../utils/metas.js"
import {freshId} from "../../../tools/fresh_id.js"
import {Item} from "../../../context/domains/outline/types.js"

export function create_new_folder({tree}: ItemMeta, parent: Item.Folder) {
	const new_id = freshId()
	tree.actions.items.add([{
		folderId: parent.id,
		item: {
			kind: "folder",
			id: new_id,
			name: `folder`,
			selected: false,
			visible: true,
			children: [],
		},
	}])
}

