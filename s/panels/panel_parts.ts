
import {SVGTemplateResult} from "@benev/slate"
import {ObsidianView} from "@benev/slate/x/shiny/parts/types.js"

import {Id} from "../tools/fresh_id.js"

export interface PanelProps {
	leafId: Id
}

export interface PanelSpec {
	label: string
	icon: SVGTemplateResult
	view: ObsidianView<[PanelProps]>
}

export interface PanelSpecs {
	[key: string]: PanelSpec
}

export function panel(t: PanelSpec) {
	return t
}

