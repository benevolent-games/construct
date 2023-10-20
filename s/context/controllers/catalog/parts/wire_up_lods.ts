
import {Mesh} from "@babylonjs/core/Meshes/mesh.js"

import {GlbProp, lod_distances} from "./types.js"

export function wire_up_lods(props: GlbProp[]) {
	for (const prop of props) {
		const top_lod = prop.lods[prop.first_lod_index]

		if (top_lod instanceof Mesh) {
			prop.lods.forEach((lod, index) => {
				if (lod && lod.node instanceof Mesh)
					top_lod.addLODLevel(lod_distances[index], lod.node)
			})
		}
	}
}

