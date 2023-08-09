
import {Suite} from "cynic"
import {Graph} from "./sketch.js"

export default <Suite>{
	"graph": {
		async "can add items"() {
			const graph = new Graph()
		},
		async "can undo adding items"() {},
		async "can create two branches of history"() {},
		async "can merge two branches of history"() {},
	},
}

