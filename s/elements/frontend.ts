
import {prepare} from "@benev/frog"
import {Context} from "../context/context.js"

export const {view, views, component, components} = prepare<Context>({
	default_auto_exportparts: true,
})

