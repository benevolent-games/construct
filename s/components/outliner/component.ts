
import {html} from "lit"
import {QuickElement} from "@benev/frog"

import {style} from "./style.js"
import {Context} from "../context.js"
import {recursively_load_folders} from "./utils/recursively_load_folders.js"
import {FoldersDragDropManager} from "../../tools/folders-drag-drop-manager.js"
import {ObjectsDragDropManager} from "../../tools/objects-drag-drop-manager.js"

export const EditOutliner = (context: Context) => class extends QuickElement {
	static styles = style

	folders_drag_drop_manager = new FoldersDragDropManager()
	objects_drag_drop_manager = new ObjectsDragDropManager()

	render() {

		const root_folder = context.folders.value.tree
		const publish = () => context.folders.publish()

		return html`
			<h1>Outliner</h1>
			<div class=folders>
				<div class=folder>
					<div
						draggable="true"
						@dragend=${() => this.folders_drag_drop_manager.drag_folder_end()}
						@dragover=${(e: DragEvent) => e.preventDefault()}
						@drop=${() => {
							this.folders_drag_drop_manager.drag_folder_drop(root_folder, publish)
							this.objects_drag_drop_manager.drag_object_drop(root_folder, publish)
						}}
						class=folder-header>
						<p>${root_folder.name}</p>
						<span @pointerdown=${(e: PointerEvent) => {
							const rootFolder = (e.target as HTMLElement).closest(".folder")
							rootFolder?.toggleAttribute("data-opened")
						}}>-
						</span>
						<span @pointerdown=${() => root_folder.create_folder(root_folder, publish)}>
							+
						</span>
					</div>
					<div class=folder-objects>
						${root_folder.instances.map(instance => html`
							<p class="item"
								?data-selected=${instance.selected}
								draggable="true"
								@dragend=${() => this.objects_drag_drop_manager.drag_object_end()}
								@dragstart=${() => this.objects_drag_drop_manager.drag_object_start(instance, root_folder)}
								@dragover=${(e: DragEvent) => e.preventDefault()}>
								${instance.name}
							</p>
						`)}
					</div>
					${recursively_load_folders(root_folder, publish, this.folders_drag_drop_manager, this.objects_drag_drop_manager)}
				</div>
			</div>
		`
	}
}
