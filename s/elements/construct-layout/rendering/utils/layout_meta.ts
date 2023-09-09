
import {TemplateResult} from "lit"

import {Layout} from "../../parts/layout.js"
import {Resizer} from "../../resize/resizer.js"

export type LayoutMeta = {
	resizer: Resizer
	on_pane_pointerdown: (path: number[]) => (event: PointerEvent) => void
	render_layout: (node: Layout.Node, path: number[]) => TemplateResult
}

