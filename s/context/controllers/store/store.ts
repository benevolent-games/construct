
import {Layout} from "../layout/parts/types.js"
import {Pojo} from "../../../tools/fancy_types.js"

export type Store = Partial<{
	layout: Layout.File
}>

export function store<R extends Pojo<any>>(storage: Storage) {
	return new Proxy({}, {
		get(_, key: string) {
			const json = storage.getItem(key)
			try {
				return json
					? JSON.parse(json)
					: undefined
			}
			catch (error) {
				return undefined
			}
		},
		set(_, key: string, value: any) {
			const json = JSON.stringify(value)
			storage.setItem(key, json)
			return true
		}
	}) as Partial<R>
}

