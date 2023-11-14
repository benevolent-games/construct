
import {Item} from "./item.js"
import {Id} from "../../../../tools/fresh_id.js"

export type OutlineState = {

	/** data blocks with details about things in this project */
	items: Item.Whatever[]

	references: Item.Reference[]

	/** reference ids that are to be rendered at the root of the hierarchy */
	root: Id[]

	isolate: Id | null
}

/*

items [
	{id, whatever},
	{id, whatever},
	{id, whatever},
	{id, whatever},
]

references: [
	[ref, id],
	[ref, id],
	[ref, id],
],

root: [ref, ref, ref, ref]

*/

