
export function middle_click(fun: () => void) {
	return (event: PointerEvent) => {
		if (event.button === 1)
			fun()
	}
}

