
import {debounce} from "@benev/slate"

export function start_resizing(canvas: HTMLCanvasElement) {
	const observer = new ResizeObserver(
		debounce(100, () => {
			const rect = canvas.getBoundingClientRect()
			canvas.width = rect.width
			canvas.height = rect.height
		})
	)

	observer.observe(canvas)

	return () => observer.disconnect()
}

