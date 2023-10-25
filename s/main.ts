
import {register_to_dom} from "@benev/slate"

import {context} from "./context/context.js"
import {ConstructEditor} from "./elements/construct-editor/element.js"

context.babylon.engine.runRenderLoop(() => {
	context.babylon.scene.render()
})

register_to_dom({ConstructEditor})

;(window as any).context = context

console.log("🎨")

