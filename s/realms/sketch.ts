
import {Pojo} from "@benev/slate"
import {Id, freshId} from "../tools/fresh_id.js"

export namespace Core {
	export type Aspect = any
	export type Kind = string

	export type AspectSchema = {[kind: Kind]: Aspect}
	export type AsAspectSchema<AS extends AspectSchema> = AS

	export type AspectReport<K extends keyof any, A> = {
		id: Id
		kind: K
		aspect: A
	}

	export type NodeReport<Aspects extends Partial<AspectSchema> = Partial<AspectSchema>> = {
		id: Id,
		aspects: Aspects,
	}

	export abstract class System {
		abstract name: string
		abstract events: Pojo<(event: {}) => void>
	}

	export type File = {
		aspects: [Id, Kind, Aspect][]

		nodes: [Id, ...Id[]][]
		 //     ↑      ↑
		 // node_id,  aspect_ids
	}

	export class Safe<AS extends AspectSchema> {
		#nodes = new Map<Id, Set<Id>>()
		#aspects = new Map<Id, [Kind, Aspect]>()

		node(id: Id) {
			const set = this.#nodes.get(id)
			if (!set)
				throw new Error(`node not found "${id}"`)
			return {id, aspects: this.#assemble_aspects(...set)} as NodeReport
		}

		aspect<Kind extends keyof AS = keyof AS>(id: Id) {
			const result = this.#aspects.get(id)
			if (!result)
				throw new Error(`aspect not found "${id}"`)
			const [kind, aspect] = result as [Kind, AS[Kind]]
			return {id, kind, aspect} as AspectReport<Kind, AS[Kind]>
		}

		create_node(...aspectIds: Id[]) {
			for (const aspectId of aspectIds)
				this.aspect(aspectId)
			const id = freshId()
			const set = new Set<Id>(aspectIds)
			this.#nodes.set(id, set)
			return [id, set]
		}

		create_aspect<Kind extends keyof AS>(kind: Kind, aspect: AS[Kind]) {
			const id = freshId()
			this.#aspects.set(id, aspect)
			return {id, kind, aspect} as AspectReport<Kind, AS[Kind]>
		}

		#assemble_aspects(...ids: Id[]) {
			const aspects: Partial<AS> = {}

			for (const id of ids) {
				const {kind, aspect} = this.aspect(id)
				aspects[kind] = aspect
			}

			return aspects
		}

		*select<Kind extends keyof AS>(...kinds: Kind[]) {
			for (const [id, aspectIds] of this.#nodes) {
				const aspects = this.#assemble_aspects(...aspectIds)
				const node_matches_selector = kinds.every(kind => kind in aspects)

				if (node_matches_selector)
					yield {
						id,
						aspects,
					} as NodeReport<{[K in Kind]: AS[K]} & Partial<AS>>
			}
		}

		static load(file: File) {
			const safe = new this()

			for (const [aspectId, kind, aspect] of file.aspects)
				safe.#aspects.set(aspectId, [kind, aspect])

			for (const [nodeId, ...aspectIds] of file.nodes)
				safe.#nodes.set(nodeId, new Set(aspectIds))
		}

		save(): File {
			return {

				nodes: [...this.#nodes.entries()]
					.map(([entityId, componentIds]) => [entityId, ...componentIds]),

				aspects: [...this.#aspects.entries()]
					.map(([id, [kind, aspect]]) => [id, kind, aspect]),
			}
		}
	}
}

//////////////////////////
//////////////////////////

type MyAspects = Core.AsAspectSchema<{
	position: [number, number, number]
	name: string
}>

const safe = new Core.Safe<MyAspects>()

const lol = safe.aspect<"position">("")

for (const {aspects} of safe.select("position")) {
	aspects.position
}

