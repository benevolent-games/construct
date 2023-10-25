
import {Use} from "@benev/slate"

export function useDropzone({
		use,
		predicate,
		handle_drop,
	}: {
		use: Use
		predicate: (event: DragEvent) => boolean
		handle_drop: (event: DragEvent) => void
	}) {

	const indicator = use.signal(false)

	const handlers = use.prepare(() => ({
		dragover: (event: DragEvent) => {
			event.preventDefault()
			if (predicate(event))
				indicator.value = true
		},
		dragleave: (_: DragEvent) => {
			indicator.value = false
		},
		drop: (event: DragEvent) => {
			event.preventDefault()
			indicator.value = false
			if (predicate(event))
				handle_drop(event)
		},
	}))

	return {
		...handlers,
		reset_indicator: () => {},
		get indicator() { return indicator.value },
	}
}

