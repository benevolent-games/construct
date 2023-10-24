
import {Use} from "@benev/slate"

export function use_drag_and_drop<P, H>({
		use,
		handle_drop,
		handle_drop_from_outside = () => {},
		predicate_for_drags_from_outside = () => true,
	}: {
		use: Use<any>
		handle_drop: (event: DragEvent, payload: P, hover: H) => void
		handle_drop_from_outside?: (event: DragEvent, hover: H) => void
		predicate_for_drags_from_outside?: (event: DragEvent) => boolean
	}) {

	const state = use.flatstate({
		payload: undefined as undefined | P,
		hover: undefined as undefined | H,
	})

	const handlers = use.prepare(() => ({
		dragstart: (payload: P) => (_: DragEvent) => {
			state.payload = payload
		},
		dragend: () => (_: DragEvent) => {
			state.payload = undefined
			state.hover = undefined
		},
		dragleave: () => (_: DragEvent) => {
			state.hover = undefined
		},
		dragover: (hover: H) => (event: DragEvent) => {
			event.preventDefault()
			if (state.payload || predicate_for_drags_from_outside(event))
				state.hover = hover
		},
		drop: (hover: H) => (event: DragEvent) => {
			event.preventDefault()
			const {payload} = state
			state.payload = undefined
			state.hover = undefined
			if (payload)
				handle_drop(event, payload, hover)
			else if (predicate_for_drags_from_outside(event))
				handle_drop_from_outside(event, hover)
		},
	}))

	return {
		...handlers,
		get payload() { return state.payload },
		get hover() { return state.hover },
	}
}

