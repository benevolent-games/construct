
import {TemplateResult} from "lit"

import {Layout} from "../../parts/layout.js"
import {Dragger} from "../../parts/dragger.js"
import {Resizer} from "../../resize/resizer.js"
import {LayoutController} from "../../parts/layout_controller.js"

export type LayoutMeta = {
	resizer: Resizer
	dragger: Dragger
	layout: LayoutController
	render_layout: (node: Layout.Node, path: number[]) => TemplateResult
}

