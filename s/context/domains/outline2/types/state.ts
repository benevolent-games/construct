
import {Item} from "./item.js"
import {Id} from "../../../../tools/fresh_id.js"

export type OutlineState = {
	items: Item.Whatever[]
	root: Id[]
}

