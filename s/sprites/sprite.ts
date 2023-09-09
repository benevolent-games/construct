
import {SVGTemplateResult, svg} from "lit"
import {id} from "./utils/svg_constants.js"
import {process_svg_into_instantiable_blob_url} from "./utils/process_svg.js"

export {svg}

export function sprite(template: SVGTemplateResult) {

	const {width, height, url} = (
		process_svg_into_instantiable_blob_url(template)
	)

	return svg`
		<svg width="${width}" height="${height}">
			<use href="${url}#${id}"></use>
		</svg>
	`
}

