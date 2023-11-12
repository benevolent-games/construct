
import {ItemMeta} from "../utils/metas.js"
import {freshId} from "../../../tools/fresh_id.js"
import {Item} from "../../../context/domains/outline/types.js"

export function create_new_folder({edcore}: ItemMeta, parent: Item.Folder) {
	const new_id = freshId()
	edcore.actions.outline.add([{
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

