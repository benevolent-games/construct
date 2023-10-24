
// import {Scene} from "@babylonjs/core/scene.js"
// import {Signal, SignalTower} from "@benev/slate"
// import {SceneLoader} from "@babylonjs/core/Loading/sceneLoader.js"

// import {parse_props} from "./parts/parse_props.js"
// import {wire_up_lods} from "./parts/wire_up_lods.js"
// import {quick_hash} from "../../../tools/quick_hash.js"
// import {Glb, PropRef, PropSearchReport} from "./parts/types.js"

// export class Catalog {
// 	#scene: Scene
// 	#glbs: Signal<Glb[]>

// 	get glbs() {
// 		return this.#glbs.value
// 	}

// 	constructor(tower: SignalTower, scene: Scene) {
// 		this.#glbs = tower.signal([])
// 		this.#scene = scene
// 	}

// 	#add_glb(glb: Glb) {
// 		this.#glbs.value = [glb, ...this.#glbs.value]
// 	}

// 	search_prop(ref: PropRef): PropSearchReport {
// 		const report: Omit<PropSearchReport, "status"> = {
// 			glb: undefined,
// 			prop: undefined,
// 		}

// 		report.glb = this.glbs.find(glb => glb.hash === ref.glb.hash)

// 		if (report.glb)
// 			report.prop = report.glb.props.find(prop => prop.name === ref.name)

// 		return {
// 			...report,
// 			status: report.glb
// 				? report.prop
// 					? "found"
// 					: "prop-missing"
// 				: "glb-missing",
// 		}
// 	}

// 	async add_file(file: File) {
// 		const hash = await quick_hash(file)
// 		const already_exists = this.glbs.find(g => g.hash === hash)

// 		if (already_exists)
// 			return false

// 		const container = await SceneLoader.LoadAssetContainerAsync(
// 			URL.createObjectURL(file),
// 			undefined,
// 			this.#scene,
// 			() => {},
// 			".glb",
// 		)

// 		const props = parse_props(container)
// 		wire_up_lods(props)

// 		this.#add_glb({
// 			hash,
// 			name: file.name,
// 			size: file.size,
// 			container,
// 			props,
// 		})

// 		return true
// 	}
// }

