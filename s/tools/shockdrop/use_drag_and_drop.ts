
import {Use} from "@benev/slate"
import {dragleave_has_exited_current_target} from "./utils/dragleave_has_exited_current_target.js"

export function useDragAndDrop<P, H>({
		use,
		handle_drop,
		out_of_band = {
			predicate: () => true,
			handle_drop: () => {},
		},
	}: {
		use: Use<any>
		handle_drop: (event: DragEvent, payload: P, hover: H) => void
		out_of_band?: {
			predicate: (event: DragEvent) => boolean
			handle_drop: (event: DragEvent, hover: H) => void
		}
	}) {

	const state = use.flatstate({
		payload: undefined as undefined | P,
		hover: undefined as undefined | H,
	})

	const handlers = use.prepare(() => ({
		dragstart: (payload: P) => (_: DragEvent) => {
			state.payload = payload
		},

		dragenter: () => (_: DragEvent) => {},

		dragend: () => (_: DragEvent) => {
			state.payload = undefined
			state.hover = undefined
		},

		dragleave: () => (event: DragEvent) => {
			if (dragleave_has_exited_current_target(event))
				state.hover = undefined
		},

		dragover: (hover: H) => (event: DragEvent) => {
			event.preventDefault()
			if (state.payload || (out_of_band && out_of_band.predicate(event)))
				state.hover = hover
		},

		drop: (hover: H) => (event: DragEvent) => {
			event.preventDefault()
			const {payload} = state
			state.payload = undefined
			state.hover = undefined
			if (payload)
				handle_drop(event, payload, hover)
			else if (out_of_band && out_of_band.predicate(event))
				out_of_band.handle_drop(event, hover)
		},
	}))

	return {
		...handlers,
		get payload() { return state.payload },
		get hover() { return state.hover },
	}
}

