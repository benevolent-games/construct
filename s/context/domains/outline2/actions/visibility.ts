
import {actionate} from "../../actionate.js"
import {Id} from "../../../../tools/fresh_id.js"

export const outline_visibility_actions = actionate.outline2.blueprint(action => ({
	show: action(outline => (...ids: Id[]) => {
		for (const item of outline.getItems(...ids))
			item.visible = true
	}),

	hide: action(outline => (...ids: Id[]) => {
		for (const item of outline.getItems(...ids))
			item.visible = false
	}),
}))

