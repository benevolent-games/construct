
import {components} from "./frontend.js"
import {EditorLayout} from "./editor-layout/element.js"

export const elements = components({
	EditorLayout,
})

export type Elements = ReturnType<typeof elements>

