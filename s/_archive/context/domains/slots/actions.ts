
import {actionate} from "../actionate.js"
import {GlbSlot, Hash} from "../../state.js"
import {Id} from "../../../tools/fresh_id.js"

export const slots = actionate.slots.blueprint(action => ({
	add: action(slots => (slot: GlbSlot) => {
		slots.push(slot)
	}),

	delete: action(slots => (id: Id) => {
		slots = slots.filter(s => s.id !== id)
	}),

	rename: action(slots => (id: Id, name: string) => {
		const slot = slots.find(s => s.id === id)!
		slot.name = name
	}),

	assign_glb: action(slots => (
			id: Id,
			glb_hash: Hash | null,
		) => {
		const slot = slots.find(s => s.id === id)!
		slot.glb_hash = glb_hash
	}),

	swap: action(slots => (a: Id, b: Id) => {
		const slotA = slots.find(s => s.id === a)!
		const slotB = slots.find(s => s.id === b)!
		const hashA = slotA.glb_hash
		const hashB = slotB.glb_hash
		slotA.glb_hash = hashB
		slotB.glb_hash = hashA
	}),
}))

