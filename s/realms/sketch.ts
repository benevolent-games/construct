
import {Pojo} from "@benev/slate"
import {Id, freshId} from "../tools/fresh_id.js"

export namespace Core {
	export type Node = Set<Id>

	export type Aspect = {
		kind: string
		[key: string]: any
	}

	export abstract class System {
		abstract name: string
		abstract events: Pojo<(event: {}) => void>
	}

	export type File = {
		nodes: [Id, Id[]][]
		aspects: [Id, Aspect][]
	}

	export class Safe {
		static load(file: File) {
			const safe = new this()

			for (const [id, aspect] of file.aspects)
				safe.#aspects.set(id, aspect)

			for (const [id, node] of file.nodes)
				safe.#nodes.set(id, new Set(node))
		}

		#nodes = new Map<Id, Node>()
		#aspects = new Map<Id, Aspect>()

		node(id: Id) {
			const node = this.#nodes.get(id)
			if (!node)
				throw new Error(`node not found`)
			return node
		}

		aspect(id: Id) {
			const aspect = this.#aspects.get(id)
			if (!aspect)
				throw new Error(`node not found`)
			return aspect
		}

		create_node(...aspectIds: Id[]) {
			for (const aspectId of aspectIds)
				this.aspect(aspectId)
			const id = freshId()
			const node = new Set<Id>(aspectIds)
			this.#nodes.set(id, node)
			return [id, node]
		}

		create_aspect<A extends Aspect>(aspect: A): [Id, A] {
			const id = freshId()
			this.#aspects.set(id, aspect)
			return [id, aspect]
		}

		*select(...kinds: string[]) {
			for (const [nodeId, node] of this.#nodes) {
				const aspects = [...node]
					.map(aspectId => [aspectId, this.aspect(aspectId)] as [Id, Aspect])

				const match = kinds.every(kind =>
					aspects.some(([,aspect]) => aspect.kind === kind)
				)

				if (match)
					yield [
						nodeId,
						aspects,
					]
			}
		}

		save(): File {
			return {
				nodes: [...this.#nodes.entries()]
					.map(([entityId, componentIds]) => [entityId, [...componentIds]]),
				aspects: [...this.#aspects.entries()],
			}
		}
	}
}

