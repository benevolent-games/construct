
import {contains} from "./contains.js"
import {evently, prevent_defaults} from "./evently.js"

export function drag_and_drop(
		element: HTMLElement,
		handle_drop: (list: FileList) => void,
	) {

	function highlight() {
		element.setAttribute("data-drop-highlight", "")
	}

	function unhighlight(event: DragEvent) {
		if (!contains(element, event.relatedTarget as Node))
			element.removeAttribute("data-drop-highlight")
	}

	const on = evently(element)

	on("dragenter", "dragover", "dragleave", "drop")
		(prevent_defaults)

	on("dragenter", "dragover")
		(highlight)

	on("dragleave", "drop")
		(unhighlight)

	on("drop")<DragEvent>(({dataTransfer}) => {
		if (dataTransfer)
			handle_drop(dataTransfer.files)
	})
}

