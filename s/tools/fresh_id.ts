
import {generate_id} from "@benev/slate"

export type Id = string

export function freshId() {
	return generate_id()
}

