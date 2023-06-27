import {theme} from "./theme.js"
import {Context} from "./context.js"
import {EditOutliner} from "./outliner/component.js"
import {pass_context_to_elements, theme_elements, update_elements_on_cue_changes} from "@benev/frog"

export const elements = {
	EditOutliner
}

export function prepare_all_components(context: Context) {
	return theme_elements(theme,
		update_elements_on_cue_changes(context.cues,
			pass_context_to_elements(context, elements)))
}

