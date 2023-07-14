import {html, TemplateResult} from "lit"

import {Publish} from "../../types.js"
import {Folder} from "../../../tools/folder.js"
import {FoldersDragDropManager} from "../../../tools/folders-drag-drop-manager.js"
import {ObjectsDragDropManager} from "../../../tools/objects-drag-drop-manager.js"

import arrowDownSvg from "../../../icons/akar/arrow-down.svg.js"
import {remove_indicator, set_indicator} from "./drag-drop-indicators.js"
import folderSvg from "../../../icons/material-design-icons/folder.svg.js"
import objectSvg from "../../../icons/material-design-icons/object.svg.js"
import deleteBinSvg from "../../../icons/material-design-icons/delete-bin.svg.js"
import visibilitySvg from "../../../icons/material-design-icons/visibility.svg.js"

export function recursively_load_folders(
	folder: Folder,
	publish: Publish,
	folders_drag_drop_manager: FoldersDragDropManager,
	objects_drag_drop_manager: ObjectsDragDropManager): TemplateResult[] {

	return folder.folders.map(child_folder => html`
		<div class="folder">
			<div draggable="true"
				@dragend=${() => folders_drag_drop_manager.drag_folder_end()}
				@dragstart=${() => folders_drag_drop_manager.drag_folder_start(folder, child_folder)}
				@dragover=${(e: DragEvent) => e.preventDefault()}
				@drop=${(e: DragEvent) => {
					folders_drag_drop_manager.drag_folder_drop(child_folder)
					objects_drag_drop_manager.drag_object_drop(child_folder)
					remove_indicator(e)
				}}
				@dragenter=${set_indicator}
				@dragleave=${remove_indicator}
				class=folder-header>
				${folderSvg}
				<p>${folder.name}</p>
				<span class="open-folder" @pointerdown=${(e: PointerEvent) => {
					const rootFolder = (e.target as HTMLElement).closest(".folder")
					rootFolder?.toggleAttribute("data-opened")
				}}>
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
			<div class=folder-objects>
				${child_folder?.instances?.map(instance => html`
				${objectSvg}
				<p class="item"
					?data-selected=${instance.selected}
					draggable="true"
					@dragend=${() => objects_drag_drop_manager.drag_object_end()}
					@dragstart=${() => objects_drag_drop_manager.drag_object_start(instance, child_folder)}
					@dragover=${(e: DragEvent) => e.preventDefault()}
				>
					${instance.name}
				</p>
				<span class="toggle-visibility">
					${visibilitySvg}
				</span>
				<span @pointerdown=${() => child_folder.delete_item(instance)} class="delete-folder">
					${deleteBinSvg}
				</span>
				`)}
			</div>
			${recursively_load_folders(child_folder, publish, folders_drag_drop_manager, objects_drag_drop_manager)}
	</div>
	`)

}
