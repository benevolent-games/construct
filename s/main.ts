
import "@benev/toolbox/x/html.js"
import {registerElements} from "@chasemoskal/magical"

import {Context} from "./components/context.js"
import {prepare_all_components} from "./components/prepare_all_components.js"

const context = new Context()
const world = context.world.state
world.details.vertex_count = 123
world.details.scene_name = "my cool scene"
setInterval(() => world.details.vertex_count++, 1000)

registerElements(prepare_all_components(context))

console.log("🎨")

