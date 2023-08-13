
import {Pipe, provide_context, apply_theme, cue_reactivity} from "@benev/frog"

import {theme} from "./theme.js"
import {Context} from "./context.js"
import {EditOutlinerDisplay} from "./outliner-display/component.js"

export const elements = {
	EditOutlinerDisplay,
}

export function prepare_all_components(context: Context) {
	return Pipe.with(elements)
		.to(provide_context(context))
		.to(cue_reactivity(context.cues))
		.to(apply_theme(theme))
		.done()
}

