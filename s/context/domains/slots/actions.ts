
import {Id} from "../../../tools/fresh_id.js"
import {GlbSlot, Hash, State} from "../../state.js"
import {Action} from "../../framework/action_namespace.js"

export const slots = Action.specs<State>()(({action}) => ({
	add: action(state => (slot: GlbSlot) => {
		state.slots.push(slot)
	}),

	delete: action(state => (id: Id) => {
		state.slots = state.slots.filter(s => s.id !== id)
	}),

	rename: action(state => (id: Id, name: string) => {
		const slot = state.slots.find(s => s.id === id)!
		slot.name = name
	}),

	assign_glb: action(state => (
			id: Id,
			glb_hash: Hash | null,
		) => {
		const slot = state.slots.find(s => s.id === id)!
		slot.glb_hash = glb_hash
	}),

	swap: action(state => (a: Id, b: Id) => {
		const slotA = state.slots.find(s => s.id === a)!
		const slotB = state.slots.find(s => s.id === b)!
		const hashA = slotA.glb_hash
		const hashB = slotB.glb_hash
		slotA.glb_hash = hashB
		slotB.glb_hash = hashA
	}),
}))

