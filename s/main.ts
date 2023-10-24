
import {register_to_dom} from "@benev/slate"

import {context} from "./context/context.js"
import {ConstructLayout} from "./elements/construct-layout/element.js"

context.babylon.engine.runRenderLoop(() => {
	context.babylon.scene.render()
})

register_to_dom({ConstructLayout})

;(window as any).context = context

console.log("🎨")

