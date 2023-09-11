
export function defined<X, Y>(x: X, act: {
		yes: (x: NonNullable<X>) => Y
		no: () => Y
	}) {
	return x === undefined
		? act.no()
		: act.yes(x!)
}

