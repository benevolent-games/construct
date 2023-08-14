
export const evently = (
	(element: HTMLElement) => (
		(...events: string[]) => (
			<E extends Event>(fun: (event: E) => void) => {

				for (const name of events)
					element.addEventListener(name, fun as any)

				return () => {
					for (const name of events)
						element.removeEventListener(name, fun as any)
				}
			}
		)
	)
)

export function prevent_defaults(e: Event) {
	e.preventDefault()
	e.stopPropagation()
}

