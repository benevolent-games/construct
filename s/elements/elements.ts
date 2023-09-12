
import {requirement} from "@benev/slate"

import {Context} from "../context/context.js"
import {components} from "../framework/frontend.js"
import {ConstructLayout} from "./construct-layout/element.js"

export const elements = requirement<Context>()(context => components(context, {
	ConstructLayout,
}))

export type Elements = ReturnType<typeof elements>

