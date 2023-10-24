
import {Scene} from "@babylonjs/core/scene.js"
import {generateId} from "@benev/toolbox/x/utils/generate-id.js"
import {Signal, SignalTower, StateTree, WatchTower} from "@benev/slate"

import {Actions} from "../../actions.js"
import {GlbSlot, Hash, State} from "../../state.js"
import {Id} from "../../domains/outline/types.js"
import {quick_hash} from "../../../tools/quick_hash.js"
import {parse_props} from "../catalog/parts/parse_props.js"
import {wire_up_lods} from "../catalog/parts/wire_up_lods.js"
import {SceneLoader} from "@babylonjs/core/Loading/sceneLoader.js"
import {Glb, GlbProp, PropAddress, PropTrace} from "../catalog/parts/types.js"

export class Warehouse {
	glbs: Signal<Glb[]>

	constructor(
			tower: SignalTower,
			watch: WatchTower,
			public app: StateTree<State>,
			public scene: Scene,
			public actions: Actions,
		) {

		this.glbs = tower.signal([])
		watch.track(
			() => app.state.slots,
			() => this.prune_orphaned_glbs(),
		)
	}

	get_glb(hash: Hash) {
		return this.glbs.value.find(g => g.hash === hash)
	}

	prune_orphaned_glbs() {
		const {slots} = this.app.state
		const orphans = this.glbs.value
			.filter(glb => !slots.some(s => s.glb_hash === glb.hash))
			.map(glb => glb.hash)
		if (orphans.length > 0) {
			this.glbs.value = this.glbs.value
				.filter(glb => !orphans.includes(glb.hash))
			console.log("warehouse pruned orphan glbs", orphans)
		}
	}

	trace_prop(ref: PropAddress): PropTrace {
		const {slots} = this.app.state
		let slot: GlbSlot | undefined
		let glb: Glb | undefined
		let prop: GlbProp | undefined

		;(slot = slots.find(s => s.id === ref.slot))
			&& (glb = this.glbs.value.find(g => g.hash === slot!.glb_hash))
			&& (prop = glb.props.find(p => p.name === ref.prop))

		return {
			slot,
			glb,
			prop,
			status: (
				!slot ? "missing-slot"
				: !glb ? "missing-glb"
				: !prop ? "missing-prop"
				: "found"
			)
		}
	}

	async add_glb_file(file: File, slot_id?: Id) {
		const hash = await quick_hash(file)
		const already_exists = this.glbs.value.find(g => g.hash === hash)

		if (already_exists)
			return false

		const container = await SceneLoader.LoadAssetContainerAsync(
			URL.createObjectURL(file),
			undefined,
			this.scene,
			() => {},
			".glb",
		)

		const props = parse_props(container)
		wire_up_lods(props)

		const glb: Glb = {
			hash,
			name: file.name,
			size: file.size,
			container,
			props,
		}

		this.glbs.value = [...this.glbs.value, glb]

		if (slot_id) {
			this.actions.set_slot_glb({
				id: slot_id,
				glb_hash: hash,
			})
		}
		else {
			this.actions.add_slot({
				id: generateId(),
				glb_hash: hash,
				name: convert_file_name_to_slot_name(file.name),
			})
		}

		return true
	}
}

function convert_file_name_to_slot_name(filename: string) {
	const [first] = filename.split(".")
	return first || "slot"
}

