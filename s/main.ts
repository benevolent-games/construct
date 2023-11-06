
import {register_to_dom} from "@benev/slate"

import {slate} from "./context/slate.js"
import {panels} from "./panels/panels.js"
import {Context} from "./context/context.js"
import {ConstructEditor} from "./elements/construct-editor/element.js"
import {game_editor_layouts} from "./context/controllers/layout/game_editor_layouts.js"

slate.context = new Context({
	panels,
	layouts: game_editor_layouts,
})

register_to_dom({ConstructEditor})

;(window as any).context = slate.context

console.log("🎨")

