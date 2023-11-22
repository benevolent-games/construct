
import {Id} from "../../../../tools/fresh_id.js"
import {EditorBlock, EditorRef} from "../editor_data.js"

export type OutlineState = {

	/** data-blocks about things in this project */
	blocks: EditorBlock[]

	/** references to data blocks, which can have their own data */
	refs: EditorRef[]

	/** root-level references */
	root: Id[]
}

