
import {Context, css, prepare_frontend} from "@benev/slate"

export class AppContext extends Context {
	theme = css`
		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
		}

		button {
			font: inherit;
			color: inherit;
			border: none;
			border-radius: 0.2em;
			background: transparent;
		}

		button.based {
			display: inline-flex;
			align-items: center;
			justify-content: center;

			gap: 0.3em;
			padding: 0.1em 0.2em;

			background: transparent;
			border: 1px solid color-mix(in srgb, currentColor, transparent 80%);
			background: color-mix(in srgb, currentColor, transparent 90%);

			> svg {
				width: 1em;
				height: 1em;
			}

			&:hover {
				border-color: color-mix(in srgb, currentColor, transparent 70%);
				background: color-mix(in srgb, currentColor, transparent 90%);
			}

			&:hover:active {
				border-color: color-mix(in srgb, currentColor, transparent 60%);
				background: color-mix(in srgb, currentColor, transparent 85%);
			}
		}
	`
}

export const {carbon, oxygen, obsidian, quartz} = prepare_frontend(new AppContext)

// import {BaseContext, Flat} from "@benev/slate"

// export class Context implements BaseContext {
// 	constructor(
// 		public flat: Flat,
// 		public theme: CSSResultGroup,
// 	) {}
// }

// import {BenevTheater} from "@benev/toolbox/x/babylon/theater/element.js"

// import {Graph} from "./controllers/graph/graph.js"
// import {World} from "./controllers/world/world.js"
// import {Catalog} from "./controllers/catalog/catalog.js"
// import {Outliner} from "./controllers/outliner/outliner.js"

// export class Context implements PrepperContext {
// 	readonly catalog: Catalog
// 	readonly graph: Graph
// 	readonly world: World
// 	readonly outliner: Outliner

// 	constructor(
// 			public readonly flat: Flat,
// 			public readonly theme: CSSResultGroup,
// 			public theater: BenevTheater,
// 		) {

// 		this.graph = new Graph()
// 		this.world = new World(this.graph, theater)
// 		this.outliner = new Outliner(this.flat, this.graph)
// 		this.catalog = new Catalog(this.flat, this.graph, theater.babylon.scene)
// 	}
// }

