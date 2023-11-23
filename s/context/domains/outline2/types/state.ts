
import {Data} from "../data/namespace.js"
import {Id} from "../../../../tools/fresh_id.js"

export type OutlineState<C extends Data.Concepts> = {

	/** data-blocks about things in this project */
	blocks: Data.Block<C[keyof C]["block"]>[]

	/** references to data blocks, which can have their own data */
	references: Data.Reference<C[keyof C]["reference"]>[]

	/** root-level references */
	root: Id[]
}

