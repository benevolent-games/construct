import {html, TemplateResult} from "lit"

import {Publish} from "../../types.js"
import {Folder} from "../../../tools/folder.js"
import {renderFolderHeader} from "../renderers/render-folder-header.js"
import {renderFolderObjects} from "../renderers/render-folder-objects.js"
import {FoldersDragDropManager} from "../../../tools/folders-drag-drop-manager.js"
import {ObjectsDragDropManager} from "../../../tools/objects-drag-drop-manager.js"

export function recursively_load_folders(
	folder: Folder,
	publish: Publish,
	folders_drag_drop_manager: FoldersDragDropManager,
	objects_drag_drop_manager: ObjectsDragDropManager): TemplateResult[] {

	return folder.folders.map(child_folder => html`
		<div class="folder">
			${renderFolderHeader(
				folder, publish, child_folder,
				folders_drag_drop_manager, objects_drag_drop_manager)}
			${renderFolderObjects(child_folder, objects_drag_drop_manager, publish)}
			${recursively_load_folders(child_folder, publish, folders_drag_drop_manager, objects_drag_drop_manager)}
		</div>
	`)

}
