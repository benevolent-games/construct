
export function this_dragleave_is_serious(event: DragEvent) {
	const rect = (event.currentTarget as any).getBoundingClientRect()
	const withinX = event.clientX >= rect.left && event.clientX <= rect.right
	const withinY = event.clientY >= rect.top && event.clientY <= rect.bottom
	const inside = withinX && withinY
	return !inside
}

