
import {Context, prepare_frontend} from "@benev/slate"
import {generateId} from "@benev/toolbox/x/utils/generate-id.js"

import {theme} from "./theme.js"
import {EditorState} from "./state.js"
import {Domain} from "./controllers/domain/domain.js"
import {Babylon} from "./controllers/babylon/babylon.js"
import {Catalog} from "./controllers/catalog/catalog.js"

const deferred = undefined as any

export class AppContext extends Context {
	theme = theme

	tree = this.watch.stateTree<EditorState>({
		outline: {
			name: "root",
			kind: "folder",
			id: generateId(),
			selected: false,
			children: [],
		},
		history: {
			action_counter: 0,
			past: [],
			future: [],
		},
	})

	babylon: Babylon = deferred
	domain: Domain = deferred
	catalog: Catalog = deferred

	setup() {
		this.babylon = new Babylon()
		this.domain = new Domain()
		this.catalog = new Catalog(this.babylon.scene)
	}
}

export const context = new AppContext()

export const {carbon, oxygen, obsidian, quartz} = (
	prepare_frontend(context)
)

