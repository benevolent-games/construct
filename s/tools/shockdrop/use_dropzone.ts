
import {Use} from "@benev/slate"
import {dragleave_is_serious} from "./utils/dragleave_is_serious.js"

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
		dragleave: (event: DragEvent) => {
			if (dragleave_is_serious(event))
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
		reset_indicator: () => {
			indicator.value = false
		},
		get indicator() {
			return indicator.value
		},
	}
}

