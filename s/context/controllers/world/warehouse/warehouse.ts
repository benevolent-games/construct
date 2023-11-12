
import {Scene} from "@babylonjs/core/scene.js"
import {Signal, signal, watch} from "@benev/slate"
import {SceneLoader} from "@babylonjs/core/Loading/sceneLoader.js"

import {GlbSlot, Hash} from "../../../state.js"
import {Edcore} from "../../edcore/controller.js"
import {parse_props} from "./parts/parse_props.js"
import {wire_up_lods} from "./parts/wire_up_lods.js"
import {Id, freshId} from "../../../../tools/fresh_id.js"
import {quick_hash} from "../../../../tools/quick_hash.js"
import {Glb, GlbProp, PropAddress, PropTrace} from "./parts/types.js"

export class Warehouse {
	readonly glbs: Signal<Glb[]>

	constructor(
			private edcore: Edcore,
			private scene: Scene,
		) {

		this.glbs = signal([])

		watch.track(
			() => edcore.state.slots,
			() => this.prune_orphaned_glbs(),
		)
	}

	get_glb(hash: Hash) {
		return this.glbs.value.find(g => g.hash === hash)
	}

	get manifest() {
		return this.edcore.state.slots
			.filter(s => s.glb_hash)
			.map(slot => ({
				slot,
				glb: this.get_glb(slot.glb_hash!)!,
			}))
			.filter(m => m.glb)
	}

	trace_prop(ref: PropAddress): PropTrace {
		const {slots} = this.edcore.state

		let slot: GlbSlot | undefined = (
			slots.find(s => s.id === ref.slot)
		)

		let glb: Glb | undefined = (
			this.glbs.value.find(g => g.hash === slot!.glb_hash)
		)

		let prop: GlbProp | undefined = (
			glb?.props.find(p => p.name === ref.prop)
		)

		return {
			slot,
			glb,
			prop,
			status: (
				!slot ? "missing-slot"
				: !glb ? "missing-glb"
				: !prop ? "missing-prop"
				: "available"
			)
		} as PropTrace
	}

	prune_orphaned_glbs() {
		const {slots} = this.edcore.state
		const orphans = this.glbs.value
			.filter(glb => !slots.some(s => s.glb_hash === glb.hash))
			.map(glb => glb.hash)
		if (orphans.length > 0) {
			this.glbs.value = this.glbs.value
				.filter(glb => !orphans.includes(glb.hash))
		}
	}

	async add_glb_file(file: File, slot_id?: Id) {
		const {actions} = this.edcore
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

		if (slot_id)
			actions.slots.assign_glb(slot_id, hash)
		else
			actions.slots.add({
				id: freshId(),
				glb_hash: hash,
				name: convert_file_name_to_slot_name(file.name),
			})

		return true
	}
}

function convert_file_name_to_slot_name(filename: string) {
	const [first] = filename.split(".")
	return first || "slot"
}

