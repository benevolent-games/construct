
import {Pojo, Pub} from "@benev/slate"
import {Input} from "../../../../tools/impulse/input.js"

type Buttons = Pojo<Pub<Input.Button>>
type Actors<B extends Buttons> = {
	[P in keyof B]: (input: Input.Button) => void
}

export function buttons<B extends Buttons>(
		pubs: B,
		actors: Actors<B>,
	) {

	const cleanups: (() => void)[] = []

	for (const [key, pub] of Object.entries(pubs)) {
		const actor = actors[key]
		cleanups.push(pub(input => {
			if (input.down)
				actor(input)
		}))
	}

	return () => cleanups.forEach(fn => fn())
}

