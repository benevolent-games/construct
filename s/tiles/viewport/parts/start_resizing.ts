
export function start_resizing(canvas: HTMLCanvasElement) {
	const observer = new ResizeObserver(() => {
		const rect = canvas.getBoundingClientRect()
		canvas.width = rect.width
		canvas.height = rect.height
	})
	observer.observe(canvas)
	return () => observer.disconnect()
}

