
import {Attrs, FlipUse} from "@benev/frog"

export function flip_attrs<A extends {[key: string]: string}>(
		use: FlipUse
	) {

	return use.setup(() => ({
		result: new Attrs<A>(use.element),
		setdown: () => {},
	}))
}

