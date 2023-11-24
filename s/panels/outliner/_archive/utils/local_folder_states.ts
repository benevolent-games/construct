
import {flat} from "@benev/slate"
import {Id} from "../../../tools/fresh_id.js"
import {EzMap} from "../../../tools/ezmap.js"

export class LocalFolderStates {
	#map = new EzMap<Id, {opened: boolean}>()

	obtain(id: Id) {
		return this.#map.guarantee(id, () => flat.state({
			opened: true,
		}))
	}
}

