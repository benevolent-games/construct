
import "@benev/toolbox/x/html.js"
import "@babylonjs/loaders/glTF/index.js"

import {Flat, register_to_dom} from "@benev/frog"
import {BenevTheater} from "@benev/toolbox/x/babylon/theater/element.js"

import {Context} from "./context/context.js"
import {drag_and_drop} from "./tools/drag_and_drop.js"
import {editor_schema} from "./tools/editor-schema.js"
import {prepare_elements} from "./elements/prepare_elements.js"

const theater = document.querySelector<BenevTheater>("benev-theater")!
await (theater.updateComplete)

const flat = new Flat()
const context = new Context(flat, theater.babylon.scene)
register_to_dom(prepare_elements(context))

drag_and_drop(document.documentElement, async list => {
	for (const file of Array.from(list))
		context.catalog.add_file(file)
})

const nubContext = theater.nubContext
if (nubContext) {
	nubContext.modes_set.assign(["selection", "transform", "fly"])
	nubContext!.schema = editor_schema
	context.world.start_world({
		nubContext,
		renderLoop: theater.babylon.renderLoop
	})
}

theater.babylon.start()

console.log("🎨")

