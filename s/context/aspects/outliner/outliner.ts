
import {Flat} from "@benev/frog"
import {Graph} from "../graph/graph.js"
import {Folder} from "./parts/items.js"
import {generateId} from "@benev/toolbox/x/utils/generate-id.js"

export type OutlinerState = {
	root: Folder
}

export class Outliner {
	#state: OutlinerState

	constructor(flat: Flat, graph: Graph) {
		this.#state = flat.state({
			root: {
				id: generateId(),
				type: "folder",
				name: "root",
				children: [],
			},
		})
	}
}

