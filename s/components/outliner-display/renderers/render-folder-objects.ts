import {html} from "lit"

import {Publish} from "../../types.js"
import {Folder} from "../../../tools/folder.js"
import eyeOpenSvg from "../../../icons/akar/eye-open.svg.js"
import eyeSlashedSvg from "../../../icons/akar/eye-slashed.svg.js"
import objectSvg from "../../../icons/material-design-icons/object.svg.js"
import deleteBinSvg from "../../../icons/material-design-icons/delete-bin.svg.js"
import {ObjectsDragDropManager} from "../../../tools/objects-drag-drop-manager.js"

export function renderFolderObjects(
	child_folder: Folder,
	objects_drag_drop_manager: ObjectsDragDropManager,
	publish: Publish
) {

	return html`
		${child_folder?.instances?.map(instance => html`
			<div ?data-notvisible=${!instance.isVisible} class="folder-object">
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
				<span @pointerdown=${() => instance.toggleVisibility(publish)} class="toggle-visibility">
					${instance.isVisible ? eyeOpenSvg : eyeSlashedSvg}
				</span>
				<span @pointerdown=${() => child_folder.delete_item(instance)} class="delete-folder">
					${deleteBinSvg}
				</span>
			</div>
		`)}
	`
}
