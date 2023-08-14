
import {css} from "lit"
import {Pipe, apply_theme, flatstate_reactivity, provide_context} from "@benev/frog"

import {Context} from "../context/context.js"
import {EdCatalog} from "./ed-catalog/elements.js"

export const elements = {EdCatalog}

const default_theme = css`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
`

export function prepare_elements(context: Context, theme = default_theme) {
	return Pipe.with(elements)
		.to(provide_context(context))
		.to(flatstate_reactivity(context.flat))
		.to(apply_theme(theme))
		.done()
}

