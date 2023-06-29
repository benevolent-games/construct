import {html, TemplateResult} from "lit"

import {Publish} from "../../types.js"
import {Folder} from "../../../tools/folder.js"
import {OutlinerManager} from "../../../tools/outliner-manager.js"

export function recursively_load_folders(folder: Folder, publish: Publish, outliner_manager: OutlinerManager): TemplateResult[] {
	return folder.folders.map(child_folder => html`
		<div class="folder">
			<div draggable="true"
				@dragend=${() => {
					outliner_manager.drag_folder_end()
					outliner_manager.drag_object_end()
				}}
				@dragstart=${() => outliner_manager.drag_folder_start(folder, child_folder)}
				@dragover=${(e: DragEvent) => e.preventDefault()}
				@drop=${() => {
					outliner_manager.drag_folder_drop(child_folder, publish)
					outliner_manager.drag_object_drop(child_folder, publish)
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
					@dragstart=${() => outliner_manager.drag_object_start(instance, child_folder)}
					@dragover=${(e: DragEvent) => e.preventDefault()}
				>
					${instance.name}
				</p>
				`)}
			</div>
			${recursively_load_folders(child_folder, publish, outliner_manager)}
	</div>
	`)
}
