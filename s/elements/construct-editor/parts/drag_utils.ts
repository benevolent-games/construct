
export function is_within(target: EventTarget | null, selector: string): HTMLElement | undefined {
	let node = target as HTMLElement | null

	while (node) {
		if (node.matches && node.matches(selector))
			return node

		node = node.parentElement
	}

	return undefined
}

export function paths_are_the_same(a: number[], b: number[]) {
	if (a.length === b.length) {
		for (let i = 0; i < a.length; i++) {
			if (a[i] !== b[i])
				return false
		}
		return true
	}
	return false
}

