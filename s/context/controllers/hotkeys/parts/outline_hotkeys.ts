
// import {Edcore} from "../../edcore/controller.js"
// import {Gesture} from "../../gesture/controller.js"
// import {OutlineGenius} from "../../outline_genius/controller.js"

// export class OutlineHotkeys {
// 	constructor(
// 			private edcore: Edcore,
// 			private outline: OutlineGenius,
// 			gesture: Gesture,
// 		) {

// 		init(gesture.on.outline.buttons.select_visible(input => {
// 			if (input.down)
// 				this.#select_all({visibleOnly: true})
// 		}))

// 		init(gesture.on.outline.buttons.select_everything(input => {
// 			if (input.down)
// 				this.#select_all({visibleOnly: false})
// 		}))

// 		// init(gesture.on.selectable.buttons.(input => {
// 		// 	if (input.down)
// 		// 		this.#select_all({visibleOnly: false})
// 		// }))
// 	}

// 	#select_all({visibleOnly}: {visibleOnly: boolean}) {
// 		const {outline, edcore} = this
// 		const anything_is_selected = outline.selected.length > 0

// 		if (anything_is_selected)
// 			edcore.actions.outline.clear_selection()
// 		else
// 			edcore.actions.outline.select(
// 				...outline.items
// 					.filter(item => visibleOnly
// 						? outline.isApparent(item.id)
// 						: true
// 					)
// 					.map(item => item.id)
// 			)
// 	}

// 	#delete_selected() {
// 		const {selected} = this.outline

// 		if (selected.length > 0)
// 			this.edcore.actions.outline.delete(
// 				...selected.map(item => item.id)
// 			)
// 	}
// }

