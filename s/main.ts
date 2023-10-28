
import {register_to_dom} from "@benev/slate"

import {panels} from "./panels/panels.js"
import {Context, set_context} from "./context/context.js"
import {ConstructEditor} from "./elements/construct-editor/element.js"

const context = new Context()
;(window as any).context = context

context.panels = panels

context.babylon.engine.runRenderLoop(() => {
	context.babylon.scene.render()
})

set_context(context)

register_to_dom({ConstructEditor})

console.log("🎨")

