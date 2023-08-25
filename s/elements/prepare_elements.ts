
import {Pipe, apply_theme, flatstate_reactivity, requirement} from "@benev/frog"

import {Context} from "../context/context.js"
import {EdCatalog} from "./ed-catalog/element.js"
import {EdOutliner} from "./ed-outliner/element.js"

export const elements = {EdCatalog, EdOutliner}

export function prepare_elements(context: Context) {
	return Pipe.with(elements)
		.to(requirement.provide(context))
		.to(flatstate_reactivity(context.flat))
		.to(apply_theme(context.theme))
		.done()
}

