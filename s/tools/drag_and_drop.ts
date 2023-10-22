
import {contains} from "./contains.js"
import {evently, prevent_defaults} from "./evently.js"

export function drag_and_drop(
		element: HTMLElement,
		handle_drop: (list: FileList) => void,
	) {

	function is_file_drag(event: DragEvent) {
		return event.dataTransfer && event.dataTransfer.types.includes("Files")
	}

	function highlight(event: DragEvent) {
		if (is_file_drag(event))
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

	on("drop")<DragEvent>(event => {
		if (is_file_drag(event))
			handle_drop(event.dataTransfer!.files)
	})
}

