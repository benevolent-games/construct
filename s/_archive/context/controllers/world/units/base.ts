
import {Id} from "../../../../tools/fresh_id.js"

export abstract class BaseUnit {
	constructor(public readonly id: Id) {}

	abstract cleanup(): void

	abstract hidden: boolean
	abstract selected: boolean
}

