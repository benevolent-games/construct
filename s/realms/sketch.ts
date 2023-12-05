
import {Pojo} from "@benev/slate"
import {Id, freshId} from "../tools/fresh_id.js"

export namespace Core {
	export type Node = Set<Id>
	export type Aspect = any
	export type Kind = string
	export type AspectSchema = {[kind: Kind]: Aspect}
	export type AsAspectSchema<AS extends AspectSchema> = AS

	export abstract class System {
		abstract name: string
		abstract events: Pojo<(event: {}) => void>
	}

	export type File = {
		nodes: [Id, Id[]][]
		aspects: [Id, [Kind, Aspect]][]
	}

	export class Safe<AS extends AspectSchema> {
		static load(file: File) {
			const safe = new this()

			for (const [id, aspect] of file.aspects)
				safe.#aspects.set(id, aspect)

			for (const [id, node] of file.nodes)
				safe.#nodes.set(id, new Set(node))
		}

		#nodes = new Map<Id, Node>()
		#aspects = new Map<Id, [string, any]>()

		node(id: Id) {
			const node = this.#nodes.get(id)
			if (!node)
				throw new Error(`node not found`)
			return node
		}

		aspect<A extends AS[keyof AS] = AS[keyof AS]>(id: Id) {
			const aspect = this.#aspects.get(id)
			if (!aspect)
				throw new Error(`node not found`)
			return aspect as A
		}

		create_node(...aspectIds: Id[]) {
			for (const aspectId of aspectIds)
				this.aspect(aspectId)
			const id = freshId()
			const node = new Set<Id>(aspectIds)
			this.#nodes.set(id, node)
			return [id, node]
		}

		create_aspect<A extends AS[keyof AS]>(aspect: A): [Id, A] {
			const id = freshId()
			this.#aspects.set(id, aspect)
			return [id, aspect]
		}

		*select<Kinds extends keyof AS>(...kinds: Kinds[]) {
			for (const [nodeId, node] of this.#nodes) {
				const aspects_array = (
					[...node].map(aspectId => [
						aspectId,
						this.aspect(aspectId),
					] as any as [Id, Aspect])
				)

				const match = kinds.every(kind =>
					aspects_array.some(([,aspect]) => aspect.kind === kind)
				)

				if (match) {
					const aspects = {} as any

					for (const [,aspect] of aspects_array)
						aspects[aspect.kind] = aspect

					yield [
						nodeId,
						aspects,
					] as [Id, {[K in Kinds]: AS[K]}]
				}
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

type MyAspects = Core.AsAspectSchema<{
	position: {
		kind: "position"
		vector: [number, number, number]
	}
	name: {
		kind: "name"
		text: string
	}
}>

const safe = new Core.Safe<MyAspects>()

for (const [id, node] of safe.select("name", "position")) {
	node.position
}

