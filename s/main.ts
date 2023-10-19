
import "@benev/toolbox/x/html.js"
import "@babylonjs/loaders/glTF/index.js"

import {register_to_dom} from "@benev/slate"

import {context} from "./context/context.js"
import {Scene} from "@babylonjs/core/scene.js"
import {drag_and_drop} from "./tools/drag_and_drop.js"
import {Engine} from "@babylonjs/core/Engines/engine.js"
import {ConstructLayout} from "./elements/construct-layout/element.js"

const canvas = new OffscreenCanvas(160, 90)
const engine = new Engine(canvas)
const scene = new Scene(engine)

context.setup(scene)

drag_and_drop(document.documentElement, async list => {
	for (const file of Array.from(list))
		context.catalog.add_file(file)
})

// context.world.start_world()
// theater.babylon.start()

register_to_dom({ConstructLayout})

console.log("🎨")

