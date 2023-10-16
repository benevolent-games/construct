
import {register_to_dom} from "@benev/slate"
import {ConstructLayout} from "./elements/construct-layout/element.js"

register_to_dom({ConstructLayout})

console.log("🎨")

// import "@benev/toolbox/x/html.js"
// import "@babylonjs/loaders/glTF/index.js"

// import {BenevTheater} from "@benev/toolbox/x/babylon/theater/element.js"

// import {drag_and_drop} from "./tools/drag_and_drop.js"
// import {prepare_elements} from "./elements/prepare_elements.js"

// const theater = document.querySelector<BenevTheater>("benev-theater")!
// await (theater.updateComplete)


// drag_and_drop(document.documentElement, async list => {
// 	for (const file of Array.from(list))
// 		context.catalog.add_file(file)
// })

// context.world.start_world()

// theater.babylon.start()

