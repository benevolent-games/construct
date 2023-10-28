
import {register_to_dom} from "@benev/slate"

import {panels} from "./panels/panels.js"
import {Context} from "./context/context.js"
import {frontend} from "./context/frontend.js"
import {ConstructEditor} from "./elements/construct-editor/element.js"

frontend.set_context(new Context(panels))

register_to_dom({ConstructEditor})

;(window as any).context = frontend.shell.context

console.log("🎨")

