
import {svg} from "lit"
import {id} from "./utils/svg_constants.js"
import {process_svg_into_instantiable_blob_url} from "./utils/process_svg.js"

export function sprite(svg_string: string) {

	const {width, height, url} = (
		process_svg_into_instantiable_blob_url(svg_string)
	)

	return svg`
		<svg width="${width}" height="${height}">
			<use href="${url}#${id}"></use>
		</svg>
	`
}

