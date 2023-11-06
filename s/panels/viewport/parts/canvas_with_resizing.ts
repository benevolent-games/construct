
import {initFn} from "@benev/slate"
import {start_resizing} from "./start_resizing.js"

export const canvas_with_resizing = initFn(() => {
	const canvas = document.createElement("canvas")
	const stop_resizing = start_resizing(canvas)
	return [canvas, stop_resizing]
})

