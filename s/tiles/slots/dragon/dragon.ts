
import {Use} from "@benev/slate"

export function useDragon<P, H>(
		use: Use<any>,
		dropAction: (payload: P, dropzone: H) => void,
	) {

	const state = use.flatstate({
		payload: undefined as undefined | P,
		hover: undefined as undefined | H,
	})

	const handlers = use.prepare(() => ({
		start: (payload: P) => (_: DragEvent) => {
			state.payload = payload
		},
		end: () => (_: DragEvent) => {
			state.payload = undefined
			state.hover = undefined
		},
		leave: () => (_: DragEvent) => {
			state.hover = undefined
		},
		over: (hover: H) => (event: DragEvent) => {
			event.preventDefault()
			state.hover = hover
		},
		drop: (hover: H) => (_: DragEvent) => {
			const {payload} = state
			state.payload = undefined
			state.hover = undefined
			if (payload)
				dropAction(payload, hover)
		},
	}))

	return {
		...handlers,
		payload: state.payload,
		hover: state.hover,
	}
}

export function dragonFileInterceptor<P, H>(
		use: Use<any>,
		dragon: ReturnType<typeof useDragon<P, H>>,
	) {

	const state = use.flatstate({
		hover: undefined as undefined | H,
	})

	const handlers = use.prepare(() => ({
		start: dragon.start,
		end: dragon.end,

		over: (hover: H) => (event: DragEvent) => {
			if (dragon.payload)
				dragon.over(hover)(event)
			else {
				console.log("FILEDRAG OVER")
				state.hover = hover
			}
		},

		leave: () => (event: DragEvent) => {
			if (dragon.payload)
				dragon.leave()(event)
			else {
				console.log("FILEDRAG LEAVE BRAH")
				state.hover = undefined
			}
		},

		drop: (hover: H) => (event: DragEvent) => {
			if (dragon.payload)
				dragon.drop(hover)(event)
		},
	}))

	return {
		...handlers,
		hover: state.hover,
	}
}

