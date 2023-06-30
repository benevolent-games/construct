import {html, TemplateResult} from "lit"

import {Publish} from "../../types.js"
import {Folder} from "../../../tools/folder.js"
import {FoldersManager} from "../../../tools/folders-manager.js"
import {ObjectsManager} from "../../../tools/objects-manager.js"

export function recursively_load_folders(
	folder: Folder,
	publish: Publish,
	folders_manager: FoldersManager,
	objects_manager: ObjectsManager): TemplateResult[] {

	return folder.folders.map(child_folder => html`
		<div class="folder">
			<div draggable="true"
				@dragend=${() => {
					folders_manager.drag_folder_end()
					objects_manager.drag_object_end()
				}}
				@dragstart=${() => folders_manager.drag_folder_start(folder, child_folder)}
				@dragover=${(e: DragEvent) => e.preventDefault()}
				@drop=${() => {
					folders_manager.drag_folder_drop(child_folder, publish)
					objects_manager.drag_object_drop(child_folder, publish)
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
					@dragstart=${() => objects_manager.drag_object_start(instance, child_folder)}
					@dragover=${(e: DragEvent) => e.preventDefault()}
				>
					${instance.name}
				</p>
				`)}
			</div>
			${recursively_load_folders(child_folder, publish, folders_manager, objects_manager)}
	</div>
	`)

}
