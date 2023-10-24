
export type HandleFileDrop = (files: File[], event: DragEvent) => void

export class Shockdrop {
	static is_file_drag(event: DragEvent) {
		return !!(
			event.dataTransfer &&
			event.dataTransfer.types.includes("Files")
		)
	}

	element: HTMLElement
	highlight_attribute: string
	handle_file_drop: HandleFileDrop

	constructor(params: {
			element: HTMLElement
			highlight_attribute: string
			handle_file_drop: (files: File[], event: DragEvent) => void
		}) {

		this.element = params.element
		this.handle_file_drop = params.handle_file_drop
		this.highlight_attribute = params.highlight_attribute

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
			this.element.setAttribute(this.highlight_attribute, "")
	}

	unhighlight() {
		this.element.removeAttribute(this.highlight_attribute)
	}
}

