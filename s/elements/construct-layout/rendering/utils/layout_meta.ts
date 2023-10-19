
import {TemplateResult} from "lit"

import {Layout} from "../../parts/layout.js"
import {Resizer} from "../../resize/resizer.js"
import {TabDragger} from "../../parts/tab_dragger.js"
import {LayoutController} from "../../parts/layout_controller.js"

export type LayoutMeta = {
	resizer: Resizer
	dragger: TabDragger
	layout: LayoutController
	render_layout: (node: Layout.Node, path: number[]) => TemplateResult
}

