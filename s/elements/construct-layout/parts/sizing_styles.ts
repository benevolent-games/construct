
export function sizing_styles(size: number | undefined) {
	return size !== undefined
		? `flex: 0 0 ${size}%;`
		: `flex: 1 1 auto;`
}

