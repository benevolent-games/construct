
import {OutlineAdmin} from "../admin.js"
import {actionate} from "../../actionate.js"
import {Id} from "../../../../tools/fresh_id.js"

export const outline_selection_actions = actionate.outline2.blueprint(action => {

	const select = (outline: OutlineAdmin) => (...ids: Id[]) => {
		for (const item of outline.getItems(...ids))
			item.selected = true
	}

	const deselect = (outline: OutlineAdmin) => (...ids: Id[]) => {
		for (const item of outline.getItems(...ids))
			item.selected = false
	}

	const clear_selection = (outline: OutlineAdmin) => () => {
		for (const item of outline.items)
			item.selected = false
	}

	return {
		select: action(select),
		deselect: action(deselect),
		clear: action(clear_selection),

		clear_then_select: action(outline => (...ids: Id[]) => {
			clear_selection(outline)()
			select(outline)(...ids)
		}),

		clear_then_deselect: action(outline => (...ids: Id[]) => {
			clear_selection(outline)()
			deselect(outline)(...ids)
		}),
	}
})

