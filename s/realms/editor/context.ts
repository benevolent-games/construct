
import {FabricContext} from "../fabric/context.js"
import {Gesture} from "../fabric/models/gesture/gesture.js"
import {EditorBinds, editor_binds} from "./models/gesture/editor_binds.js"

export class EditorContext extends FabricContext {

	/** user input, pointer lock, and focalization */
	gesture: Gesture<EditorBinds> = new Gesture({binds: editor_binds()})
}

