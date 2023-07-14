import {html} from "lit"

import {Publish} from "../../types.js"
import {Folder} from "../../../tools/folder.js"
import arrowDownSvg from "../../../icons/akar/arrow-down.svg.js"
import folderSvg from "../../../icons/material-design-icons/folder.svg.js"
import deleteBinSvg from "../../../icons/material-design-icons/delete-bin.svg.js"
import visibilitySvg from "../../../icons/material-design-icons/visibility.svg.js"
import {FoldersDragDropManager} from "../../../tools/folders-drag-drop-manager.js"
import {ObjectsDragDropManager} from "../../../tools/objects-drag-drop-manager.js"

export function renderFolderHeader(
	folder: Folder,
	publish: Publish,
	child_folder: Folder,
	folders_drag_drop_manager: FoldersDragDropManager,
	objects_drag_drop_manager: ObjectsDragDropManager
) {

	const attribute_manager = {
		set_drag_indicator(e: DragEvent) {
			const target = e.target as HTMLElement
			const folder = target.closest(".folder-header")
			folder?.setAttribute("data-outline", "")
		},
		remove_drag_indicator(e: DragEvent) {
			const target = e.target as HTMLElement
			if(target.className == "folder-header")
				target.removeAttribute("data-outline")
		},
		toggle_folder_opened(e: PointerEvent) {
			const rootFolder = (e.target as HTMLElement).closest(".folder")
			rootFolder?.toggleAttribute("data-opened")
		}
	}

	return html`
		<div
			draggable="true"
			@dragend=${() => folders_drag_drop_manager.drag_folder_end()}
			@dragstart=${() => folders_drag_drop_manager.drag_folder_start(folder, child_folder)}
			@dragover=${(e: DragEvent) => e.preventDefault()}
			@drop=${(e: DragEvent) => {
				folders_drag_drop_manager.drag_folder_drop(child_folder)
				objects_drag_drop_manager.drag_object_drop(child_folder)
				attribute_manager.remove_drag_indicator(e)
			}}
			@dragenter=${attribute_manager.set_drag_indicator}
			@dragleave=${attribute_manager.remove_drag_indicator}
			class=folder-header>
			${folderSvg}
			<p>${folder.name}</p>
			<span class="open-folder" @pointerdown=${attribute_manager.toggle_folder_opened}>
				${arrowDownSvg}
			</span>
			<span class="add-folder" @pointerdown=${() => child_folder.create_folder(child_folder, publish)}>
				+
			</span>
			<span class="toggle-visibility">
				${visibilitySvg}
			</span>
			<span @pointerdown=${() => folder.delete_folder(child_folder)} class="delete-folder">
				${deleteBinSvg}
			</span>
		</div>
	`
}
