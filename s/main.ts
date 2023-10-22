
import {register_to_dom} from "@benev/slate"

import {context} from "./context/context.js"
import {drag_and_drop} from "./tools/drag_and_drop.js"
import {ConstructLayout} from "./elements/construct-layout/element.js"

context.babylon.engine.runRenderLoop(() => {
	context.babylon.scene.render()
})

drag_and_drop(document.documentElement, async list => {
	for (const file of Array.from(list))
		context.catalog.add_file(file)
})

register_to_dom({ConstructLayout})

;(window as any).context = context

console.log("🎨")

