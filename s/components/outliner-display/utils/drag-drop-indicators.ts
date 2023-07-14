export function set_indicator(e: DragEvent) {
	const target = e.target as HTMLElement
	const folder = target.closest(".folder-header")
	folder?.setAttribute("data-outline", "")
}

export function remove_indicator(e: DragEvent) {
	const target = e.target as HTMLElement
	if(target.className == "folder-header")
		target.removeAttribute("data-outline")
}
