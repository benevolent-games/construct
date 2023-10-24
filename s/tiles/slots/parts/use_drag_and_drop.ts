
import {Use} from "@benev/slate"

export function use_drag_and_drop<P, H>({
		use,
		handle_drop,
		handle_drop_from_outside = () => {}
	}: {
		use: Use<any>
		handle_drop: (event: DragEvent, payload: P, hover: H) => void
		handle_drop_from_outside?: (event: DragEvent, hover: H) => void
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
			state.hover = hover
		},
		drop: (hover: H) => (event: DragEvent) => {
			const {payload} = state
			state.payload = undefined
			state.hover = undefined
			if (payload)
				handle_drop(event, payload, hover)
			else
				handle_drop_from_outside(event, hover)
		},
	}))

	return {
		...handlers,
		get payload() { return state.payload },
		get hover() { return state.hover },
	}
}

