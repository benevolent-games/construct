
import {Edcore} from "../edcore/controller.js"
import {Gesture} from "../gesture/controller.js"
import {history_hotkeys} from "./aspects/history.js"
import {outline_hotkeys} from "./aspects/outline.js"
import {OutlineGenius} from "../outline_genius/controller.js"

export function establish_hotkeys(
		edcore: Edcore,
		outline: OutlineGenius,
		gesture: Gesture,
	) {

	history_hotkeys(edcore, gesture)
	outline_hotkeys(edcore, outline, gesture)
}

