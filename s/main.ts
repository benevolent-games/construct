
import "@benev/toolbox/x/html.js"
import {registerElements} from "@chasemoskal/magical"

import {Context} from "./components/context.js"
import {prepare_all_components} from "./components/prepare_all_components.js"

const context = new Context()

registerElements(prepare_all_components(context))

console.log("🎨")

