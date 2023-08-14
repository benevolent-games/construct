
import {html} from "lit"
import {QuickElement} from "@benev/frog"

import {style} from "./style.js"
import {Context} from "../context.js"
import eyeOpenSvg from "../../icons/akar/eye-open.svg.js"
import arrowDownSvg from "../../icons/akar/arrow-down.svg.js"
import {FolderObjectView} from "./views/folder-object-view.js"
import eyeSlashedSvg from "../../icons/akar/eye-slashed.svg.js"
import folderSvg from "../../icons/material-design-icons/folder.svg.js"
import {recursively_load_folders} from "./utils/recursively_load_folders.js"
import {FoldersDragDropManager} from "../../tools/folders-drag-drop-manager.js"
import {ObjectsDragDropManager} from "../../tools/objects-drag-drop-manager.js"

export const EditOutlinerDisplay = (context: Context) => class extends QuickElement {
	static styles = style

	folders_drag_drop_manager = new FoldersDragDropManager()
	objects_drag_drop_manager = new ObjectsDragDropManager()

	connectedCallback() {
		super.connectedCallback()
		for (const event of Object.values(context.folders.value.events)) {
			event(() => this.requestUpdate())
		}
	}

	render() {

		const root_folder = context.folders.value.tree
		const publish = () => context.folders.publish()

		return html`
			<h1>Outliner</h1>
			<div class=folders>
				<div class=folder>
					<div
						@dragend=${() => this.folders_drag_drop_manager.drag_folder_end()}
						@dragover=${(e: DragEvent) => e.preventDefault()}
						@drop=${() => {
							this.folders_drag_drop_manager.drag_folder_drop(root_folder)
							this.objects_drag_drop_manager.drag_object_drop(root_folder)
						}}
						?data-notvisible=${!root_folder.isVisible}
						class=folder-header>
						${folderSvg}
						<p>${root_folder.name}</p>
						<span class="open-folder" @pointerdown=${(e: PointerEvent) => {
							const rootFolder = (e.target as HTMLElement).closest(".folder")
							rootFolder?.toggleAttribute("data-opened")
						}}>
							${arrowDownSvg}
						</span>
						<span class="add-folder" @pointerdown=${() => root_folder.create_folder(root_folder, publish)}>
							+
						</span>
						<span @pointerdown=${() => root_folder.toggle_visibility(publish)} class="toggle-visibility">
							${root_folder.isVisible ? eyeOpenSvg : eyeSlashedSvg}
						</span>
					</div>
					${root_folder.instances.map(instance =>
						FolderObjectView(root_folder, this.objects_drag_drop_manager, publish, instance))}
					${recursively_load_folders(root_folder, publish, this.folders_drag_drop_manager, this.objects_drag_drop_manager)}
				</div>
			</div>
		`
	}
}