
import {SVGTemplateResult} from "lit"
import {ob, prepare_frontend, View} from "@benev/slate"

import {Context} from "../context/context.js"

export const {component, components, view, views} = prepare_frontend<Context>()

export interface TileSpec<V extends View<any>> {
	label: string
	icon: SVGTemplateResult
	view: (context: Context) => V
}

export interface TileSpecs {
	[key: string]: TileSpec<View<any>>
}

export function tile<V extends View<any>>(t: TileSpec<V>) {
	return t
}

tile.views = <Specs extends TileSpecs>(specs: Specs) => (
	ob.map(specs, spec => spec.view) as {
		[P in keyof Specs]: Specs[P]["view"]
	}
)

