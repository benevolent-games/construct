
import {components} from "./frontend.js"
import {ConstructLayout} from "./construct-layout/element.js"

export const elements = components({
	ConstructLayout,
})

export type Elements = ReturnType<typeof elements>

