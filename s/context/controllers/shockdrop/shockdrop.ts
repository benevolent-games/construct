
export type HandleFileDrop = (files: File[], event: DragEvent) => void

export class Shockdrop {
	static is_file_drag(event: DragEvent) {
		return event.dataTransfer && event.dataTransfer.types.includes("Files")
	}

	element: HTMLElement
	handle_file_drop: HandleFileDrop

	constructor(params: {
			element: HTMLElement,
			handle_file_drop: (files: File[], event: DragEvent) => void,
		}) {

		this.element = params.element
		this.handle_file_drop = params.handle_file_drop

		for (const [eventName, handler] of Object.entries(this.dragEvents))
			this.element.addEventListener(eventName as any, handler)
	}

	dragEvents = {
		dragover: (event: DragEvent) => {
			event.preventDefault()
			this.highlight(event)
		},
		dragleave: (_: DragEvent) => {
			this.unhighlight()
		},
		drop: (event: DragEvent) => {
			event.preventDefault()
			this.unhighlight()
			if (Shockdrop.is_file_drag(event))
				this.handle_file_drop(Array.from(event.dataTransfer!.files), event)
		},
	}

	highlight(event: DragEvent) {
		if (Shockdrop.is_file_drag(event))
			this.element.setAttribute("data-drop-highlight", "")
	}

	unhighlight() {
		this.element.removeAttribute("data-drop-highlight")
	}
}

