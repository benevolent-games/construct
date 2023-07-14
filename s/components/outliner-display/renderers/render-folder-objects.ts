import {html} from "lit"

import {Folder} from "../../../tools/folder.js"
import objectSvg from "../../../icons/material-design-icons/object.svg.js"
import deleteBinSvg from "../../../icons/material-design-icons/delete-bin.svg.js"
import visibilitySvg from "../../../icons/material-design-icons/visibility.svg.js"
import {ObjectsDragDropManager} from "../../../tools/objects-drag-drop-manager.js"

export function renderFolderObjects(
	child_folder: Folder,
	objects_drag_drop_manager: ObjectsDragDropManager
) {
	return html`
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
	`
}
