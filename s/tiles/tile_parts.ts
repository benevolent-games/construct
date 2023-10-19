
import {SVGTemplateResult} from "@benev/slate"
import {ObsidianView} from "@benev/slate/x/shiny/parts/types.js"

export interface TileSpec {
	label: string
	icon: SVGTemplateResult
	view: ObsidianView<[]>
}

export interface TileSpecs {
	[key: string]: TileSpec
}

export function tile(t: TileSpec) {
	return t
}

