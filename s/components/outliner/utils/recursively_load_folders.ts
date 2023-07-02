import {html, TemplateResult} from "lit"

import {Publish} from "../../types.js"
import {Folder} from "../../../tools/folder.js"
import {FoldersDragDropManager} from "../../../tools/folders-drag-drop-manager.js"
import {ObjectsDragDropManager} from "../../../tools/objects-drag-drop-manager.js"

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
				@drop=${() => {
					folders_drag_drop_manager.drag_folder_drop(child_folder, publish)
					objects_drag_drop_manager.drag_object_drop(child_folder, publish)
				}}
				class=folder-header>
				<p>${folder.name}</p>
				<span @pointerdown=${(e: PointerEvent) => {
					const rootFolder = (e.target as HTMLElement).closest(".folder")
					rootFolder?.toggleAttribute("data-opened")
					}}>-
				</span>
				<span @pointerdown=${() => child_folder.create_folder(child_folder, publish)}>+</span>
			</div>
			<div class=folder-objects>
				${child_folder?.instances?.map(instance => html`
				<p class="object"
					draggable="true"
					@dragend=${() => objects_drag_drop_manager.drag_object_end()}
					@dragstart=${() => objects_drag_drop_manager.drag_object_start(instance, child_folder)}
					@dragover=${(e: DragEvent) => e.preventDefault()}
				>
					${instance.name}
				</p>
				`)}
			</div>
			${recursively_load_folders(child_folder, publish, folders_drag_drop_manager, objects_drag_drop_manager)}
	</div>
	`)

}
