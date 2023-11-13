
import {buttons} from "../parts/buttons.js"
import {Edcore} from "../../edcore/controller.js"
import {Gesture} from "../../gesture/controller.js"

export const history_hotkeys = (
		edcore: Edcore,
		gesture: Gesture,
	) => {

	return buttons(gesture.on.history.buttons, {
		undo: () => edcore.history.undo(),
		redo: () => edcore.history.redo(),
	})
}

