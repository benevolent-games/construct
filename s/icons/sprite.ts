
import {svg} from "lit"

const id = "sprite"
const xmlns = "http://www.w3.org/2000/svg"

export function sprite(svg_string: string) {
	const details = process_svg_into_instantiable_blob_url(svg_string)

	return svg`
		<svg width="${details.width}" height="${details.height}">
			<use href="${details.url}#${id}"></use>
		</svg>
	`
}

function process_svg_into_instantiable_blob_url(svg_string: string) {
	const container = document.createElement("div")
	container.innerHTML = svg_string

	const svg = container.querySelector("svg") as SVGSVGElement
	const g = document.createElementNS(xmlns, "g") as SVGGElement

	const yoink = (n: string) => {
		const result = svg.getAttribute(n)
		svg.removeAttribute(n)
		return result
	}

	yoink("xmlns")
	const width = yoink("width")
	const height = yoink("height")
	const viewBox = yoink("viewBox")

	for (const {name, value} of Array.from(svg.attributes)) {
		g.setAttribute(name, value)
		svg.removeAttribute(name)
	}

	while (svg.firstChild)
		g.appendChild(svg.firstChild)

	g.setAttribute("id", id)

	svg.appendChild(g)
	svg.setAttribute("xmlns", xmlns)
	svg.setAttribute("viewBox", viewBox!)

	const blob = new Blob([svg.outerHTML], {type: "image/svg+xml;charset=utf-8"})
	const url = URL.createObjectURL(blob)

	return {
		url,
		width,
		height,
	}
}

