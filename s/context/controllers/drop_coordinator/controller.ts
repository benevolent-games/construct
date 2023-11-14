
import {GlbSlot} from "../../state.js"
import {EditorActions} from "../../actions_blueprint.js"
import {MiniDropCoordinator} from "./mini_controller.js"
import {Warehouse} from "../world/warehouse/warehouse.js"
import {OutlinerDragDrop} from "./parts/outliner_drag_drop.js"
import {ShockDragDrop} from "../../../tools/shockdrop/drag_drop.js"
import {drag_has_files} from "../../../tools/shockdrop/utils/drag_has_files.js"

export class DropCoordinator extends MiniDropCoordinator {
	outliner: OutlinerDragDrop

	constructor(public actions: EditorActions, public warehouse: Warehouse) {
		super()
		this.outliner = new OutlinerDragDrop(actions.outline2)
	}

	slots = new ShockDragDrop<GlbSlot, GlbSlot>({
		handle_drop: (_, a, b) => {
			if (a.id !== b.id)
				this.actions.slots.swap(a.id, b.id)
		},
		out_of_band: {
			predicate: drag_has_files,
			handle_drop: (event, slot) => {
				const [file, ...files] = Array.from(event.dataTransfer!.files)
				this.warehouse.add_glb_file(file, slot.id)
				for (const file of files)
					this.warehouse.add_glb_file(file)
				event.preventDefault()
				event.stopPropagation()
				this.editor.reset_indicator()
			},
		},
	})
}

