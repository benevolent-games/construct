import {html} from "lit"
import {view} from "@chasemoskal/magical"

import {Publish} from "../../types.js"
import {Item} from "../../../tools/item.js"
import {Folder} from "../../../tools/folder.js"
import eyeOpenSvg from "../../../icons/akar/eye-open.svg.js"
import {setupListener} from "../../../tools/setup-listener.js"
import eyeSlashedSvg from "../../../icons/akar/eye-slashed.svg.js"
import objectSvg from "../../../icons/material-design-icons/object.svg.js"
import deleteBinSvg from "../../../icons/material-design-icons/delete-bin.svg.js"
import {ObjectsDragDropManager} from "../../../tools/objects-drag-drop-manager.js"

export const FolderObjectView = view({}, use => (
	child_folder: Folder,
	objects_drag_drop_manager: ObjectsDragDropManager,
	publish: Publish,
	instance: Item
) => {
	
	const [renameStarted, setRenameStarted] = use.state(false)

	use.setup(setupListener(window, "pointerdown", (e: PointerEvent) => {
		const input = e.composedPath().find((element) =>
			(element as HTMLInputElement).className === "input-rename")
		if(!input)
			setRenameStarted(false)
	}))

	return html`
		<div ?data-notvisible=${!instance.isVisible} class="folder-object">
			${objectSvg}
			<p class="item"
				?data-selected=${instance.selected}
				draggable="true"
				@dragend=${() => objects_drag_drop_manager.drag_object_end()}
				@dragstart=${() => objects_drag_drop_manager.drag_object_start(instance, child_folder)}
				@dragover=${(e: DragEvent) => e.preventDefault()}
				@dblclick=${() => setRenameStarted(true)}
			>
				${renameStarted
				? html`
					<input
						@input=${(e: InputEvent) => instance
							.set_item_name((e.target as HTMLInputElement).value)}
						class="input-rename"
						.value=${instance.name}>`
				: instance.name}
			</p>
			<span @pointerdown=${() => instance.toggle_visibility(publish)} class="toggle-visibility">
				${instance.isVisible ? eyeOpenSvg : eyeSlashedSvg}
			</span>
			<span @pointerdown=${() => child_folder.delete_item(instance)} class="delete-folder">
				${deleteBinSvg}
			</span>
		</div>
	`
})
