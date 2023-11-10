
import {flat} from "@benev/slate"
import {dragleave_has_exited_current_target} from "./utils/dragleave_has_exited_current_target.js"

export function shock_drag_and_drop<Grabbed, Hovering>({
		handle_drop,
		out_of_band = {
			predicate: () => true,
			handle_drop: () => {},
		},
	}: {
		handle_drop: (event: DragEvent, grabbed: Grabbed, hovering: Hovering) => void
		out_of_band?: {
			predicate: (event: DragEvent, hovering: Hovering) => boolean
			handle_drop: (event: DragEvent, hovering: Hovering) => void
		}
	}) {

	const state = flat.state({
		grabbed: undefined as undefined | Grabbed,
		hovering: undefined as undefined | Hovering,
	})

	const dragger = {
		draggable: () => "true",
		dragstart: (grabbed: Grabbed) => (_: DragEvent) => {
			state.grabbed = grabbed
		},
	}

	const dropper = {
		dragenter: () => (_: DragEvent) => {},

		dragend: () => (_: DragEvent) => {
			state.grabbed = undefined
			state.hovering = undefined
		},

		dragleave: () => (event: DragEvent) => {
			if (dragleave_has_exited_current_target(event))
				state.hovering = undefined
		},

		dragover: (hovering: Hovering) => (event: DragEvent) => {
			event.preventDefault()
			if (state.grabbed || (out_of_band && out_of_band.predicate(event, hovering)))
				state.hovering = hovering
		},

		drop: (hovering: Hovering) => (event: DragEvent) => {
			event.preventDefault()
			const {grabbed} = state
			state.grabbed = undefined
			state.hovering = undefined
			if (grabbed)
				handle_drop(event, grabbed, hovering)
			else if (out_of_band && out_of_band.predicate(event, hovering))
				out_of_band.handle_drop(event, hovering)
		},
	}

	return {
		dragger,
		dropper,
		get grabbed() { return state.grabbed },
		get hovering() { return state.hovering },
	}
}

