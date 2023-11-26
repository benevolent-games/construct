
import {TemplateResult} from "@benev/slate"
import {ReportMeta} from "../utils/metas.js"
import {Data} from "../../../context/domains/outline2/data/namespace.js"

export type Vision = {
	render_icon: (meta: ReportMeta) => TemplateResult | void
}

export type OutlinerVisions<C extends Data.Concepts> = {
	[K in keyof C]: Vision
}

