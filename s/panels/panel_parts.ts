
import {SVGTemplateResult} from "@benev/slate"
import {ObsidianView} from "@benev/slate/x/shiny/parts/types.js"

export interface PanelSpec {
	label: string
	icon: SVGTemplateResult
	view: ObsidianView<[]>
}

export interface PanelSpecs {
	[key: string]: PanelSpec
}

export function panel(t: PanelSpec) {
	return t
}

