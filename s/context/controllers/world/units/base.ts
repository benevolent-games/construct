
import {Id} from "../../../../tools/fresh_id.js"

export abstract class UnitBase {
	constructor(public readonly id: Id) {}
	abstract cleanup(): void
}

