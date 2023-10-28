
import {register_to_dom} from "@benev/slate"

import {panels} from "./panels/panels.js"
import {Context} from "./context/context.js"
import {slate} from "./context/slate.js"
import {ConstructEditor} from "./elements/construct-editor/element.js"

slate.context = new Context(panels)

register_to_dom({ConstructEditor})

;(window as any).context = slate.context

console.log("🎨")

